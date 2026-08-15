import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { OtpService } from '../../core/services/otp.service';
import { ApplicationService } from '../../core/services/application.service';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

type ChallengeKey = 'noTime' | 'noConsistency' | 'dontKnow' | 'dietProblem' | 'triedBefore' | 'injuries';

function challengeValidator(control: AbstractControl): ValidationErrors | null {
  const group = control as FormGroup;
  const count = Object.values(group.controls).filter((c) => c.value === true).length;
  if (count === 0) return { minRequired: true };
  if (count > 2)   return { maxExceeded: true };
  return null;
}

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [ReactiveFormsModule, FadeUpDirective],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyComponent {
  private otp = inject(OtpService);
  private appService = inject(ApplicationService);

  // OTP state: idle → sending → codeSent → verified
  readonly otpState = signal<'idle' | 'sending' | 'codeSent' | 'verified'>('idle');
  readonly otpHint  = signal<{ text: string; kind: 'success' | 'error' | '' }>({ text: '', kind: '' });
  readonly codeHint = signal('');
  readonly submitting = signal(false);
  readonly submitted  = signal(false);

  readonly goalOptions = [
    { value: 'Lose weight', label: 'Lose weight' },
    { value: 'Build muscle', label: 'Build muscle' },
    { value: 'Improve fitness & endurance', label: 'Improve fitness & endurance' },
    { value: 'Body recomposition (lose fat + gain muscle)', label: 'Body recomposition (lose fat + gain muscle)' },
    { value: 'General health & longevity', label: 'General health & longevity' },
  ];

  readonly activityOptions = [
    { value: 'Sedentary (little to no exercise)', label: 'Sedentary (little to no exercise)' },
    { value: 'Lightly active (1–2x per week)', label: 'Lightly active (1–2x per week)' },
    { value: 'Moderately active (3–4x per week)', label: 'Moderately active (3–4x per week)' },
    { value: 'Very active (5+ times per week)', label: 'Very active (5+ times per week)' },
  ];

  readonly hoursOptions = [
    { value: 'Less than 3 hours', label: 'Less than 3 hours' },
    { value: '3–5 hours', label: '3–5 hours' },
    { value: '5–8 hours', label: '5–8 hours' },
    { value: '8+ hours', label: '8+ hours' },
  ];

  readonly challengeOptions: Array<{ key: ChallengeKey; label: string; value: string }> = [
    { key: 'noTime',         label: 'No time',                       value: 'No time' },
    { key: 'noConsistency',  label: 'No consistency',                value: 'No consistency' },
    { key: 'dontKnow',       label: "Don't know what to do",         value: "Don't know what to do" },
    { key: 'dietProblem',    label: 'Diet is the problem',           value: 'Diet is the problem' },
    { key: 'triedBefore',    label: "Tried before, didn't stick",    value: "Tried before, didn't stick" },
    { key: 'injuries',       label: 'Injuries or physical limitations', value: 'Injuries or physical limitations' },
  ];

  readonly readinessOptions = [
    { value: 'Ready to start immediately', label: 'Ready to start immediately' },
    { value: 'Within the next month',      label: 'Within the next month' },
    { value: 'Just exploring for now',     label: 'Just exploring for now' },
  ];

  readonly investmentOptions = [
    { value: 'Yes, definitely',            label: 'Yes, definitely' },
    { value: 'I need to know more first',  label: 'I need to know more first' },
    { value: 'Not right now',              label: 'Not right now' },
  ];

  form = new FormGroup({
    name:  new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    goal:      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    activity:  new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hours:     new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    challenges: new FormGroup({
      noTime:        new FormControl(false, { nonNullable: true }),
      noConsistency: new FormControl(false, { nonNullable: true }),
      dontKnow:      new FormControl(false, { nonNullable: true }),
      dietProblem:   new FormControl(false, { nonNullable: true }),
      triedBefore:   new FormControl(false, { nonNullable: true }),
      injuries:      new FormControl(false, { nonNullable: true }),
    }, { validators: challengeValidator }),
    readiness:  new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    investment: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get challengesGroup(): FormGroup {
    return this.form.controls.challenges;
  }

  async sendCode(): Promise<void> {
    const emailCtrl = this.form.controls.email;
    if (!emailCtrl.value || emailCtrl.invalid) {
      this.otpHint.set({ text: 'Please enter a valid email address.', kind: 'error' });
      return;
    }
    this.otpState.set('sending');
    this.otpHint.set({ text: '', kind: '' });
    try {
      await this.otp.send(emailCtrl.value);
      this.otpState.set('codeSent');
      this.otpHint.set({ text: `Code sent to ${emailCtrl.value}. Check your inbox.`, kind: 'success' });
    } catch {
      this.otpState.set('idle');
      this.otpHint.set({ text: 'Failed to send code. Please try again.', kind: 'error' });
    }
  }

  verifyCode(code: string): void {
    const result = this.otp.verify(code);
    if (result === 'ok') {
      this.otpState.set('verified');
      this.codeHint.set('');
    } else if (result === 'expired') {
      this.codeHint.set('Code expired. Please request a new one.');
      this.otpState.set('codeSent');
    } else {
      this.codeHint.set('Incorrect code. Please try again.');
    }
  }

  resendCode(): void {
    this.codeHint.set('');
    this.sendCode();
  }

  onSubmit(): void {
    if (this.otpState() !== 'verified') {
      this.otpHint.set({ text: 'Please verify your email before submitting.', kind: 'error' });
      return;
    }
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.submitting.set(true);
    const v = this.form.getRawValue();

    const selectedChallenges = this.challengeOptions
      .filter((opt) => v.challenges[opt.key])
      .map((opt) => opt.value)
      .join(', ');

    const payload: Record<string, string> = {
      name:       v.name,
      email:      v.email,
      phone:      v.phone,
      goal:       v.goal,
      activity:   v.activity,
      hours:      v.hours,
      challenge:  selectedChallenges,
      readiness:  v.readiness,
      investment: v.investment,
    };

    this.appService.submit(payload).subscribe({
      next:  () => this.submitted.set(true),
      error: () => {
        alert('Something went wrong. Please try again.');
        this.submitting.set(false);
      },
    });
  }
}

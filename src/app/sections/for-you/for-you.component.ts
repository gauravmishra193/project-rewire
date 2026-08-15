import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

@Component({
  selector: 'app-for-you',
  standalone: true,
  imports: [FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="for-you">
      <div class="inner">
        <h2 class="section-heading" fadeUp>This is for you if&hellip;</h2>
        <ul class="check-list" role="list">
          @for (item of items; track item; let i = $index) {
            <li fadeUp [class.d1]="i === 1 || i === 2" [class.d2]="i === 3 || i === 4">
              <span class="chk">✓</span>{{ item }}
            </li>
          }
        </ul>
        <p class="not-for" fadeUp>This is NOT for people looking for shortcuts.</p>
      </div>
    </section>
  `,
  styleUrl: './for-you.component.scss',
})
export class ForYouComponent {
  readonly items = [
    "You have a demanding job and can't spend 2 hours in the gym",
    "You've tried before but life kept getting in the way",
    "You're done with generic YouTube advice",
    "You're willing to be consistent if someone shows you exactly what to do",
    "You're serious about change — not just motivated for a week",
  ];
}

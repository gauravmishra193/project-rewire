import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="problem">
      <div class="inner">
        <p class="problem-text" fadeUp>
          Most people fail not because they're lazy. They fail because they're following
          <mark>advice built for someone else's life.</mark>
        </p>
        <div class="pain-grid">
          @for (item of painItems; track item; let i = $index) {
            <div class="pain-item" fadeUp [class.d1]="i === 1" [class.d2]="i === 2">{{ item }}</div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './problem.component.scss',
})
export class ProblemComponent {
  readonly painItems = [
    'Generic plans that ignore your schedule',
    "Advice from people who've never had a desk job",
    'Progress that disappears the moment life gets busy',
  ];
}

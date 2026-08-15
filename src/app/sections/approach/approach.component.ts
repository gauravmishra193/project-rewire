import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

interface Card { title: string; body: string }

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="approach">
      <div class="inner">
        <p class="section-eyebrow">The method</p>
        <h2 class="section-heading" fadeUp>How this works differently</h2>
        <div class="cards">
          @for (card of cards; track card.title; let i = $index) {
            <div class="card" fadeUp [class.d1]="i === 1" [class.d2]="i === 2">
              <div class="card-title">{{ card.title }}</div>
              <p class="card-body">{{ card.body }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './approach.component.scss',
})
export class ApproachComponent {
  readonly cards: Card[] = [
    {
      title: 'Built around your life',
      body: "Not your gym's schedule. Your calendar, your constraints, your starting point.",
    },
    {
      title: 'No fluff. No filler.',
      body: 'Every decision is intentional. What you eat, how you train, how you recover — all connected.',
    },
    {
      title: "Engineer's mindset",
      body: 'Systems over motivation. Data over guesswork. Habits over willpower.',
    },
  ];
}

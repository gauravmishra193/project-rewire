import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">Project ReWire &mdash; Transform. Engineered.</p>
        <h1 class="hero-headline">You don't need another workout plan.</h1>
        <p class="hero-sub">You need to rewire how you think about your body.</p>
        <a href="#apply" class="cta">
          Apply Now
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4"
                  stroke="#0A0A0A" stroke-width="1.6"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}

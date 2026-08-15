import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FadeUpDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about">
      <div class="inner">
        <h2 class="section-heading" fadeUp>Who is behind this</h2>
        <div class="about-body">
          <p fadeUp>
            I'm Gauravv — a software engineer who spent years figuring out how to build a body I'm proud of
            without letting it consume my life. I'm not a certified trainer. I don't run a gym.
            I'm someone who solved this problem for myself and now helps a small number of serious people
            do the same.
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent { }

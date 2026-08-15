import { Component } from '@angular/core';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProblemComponent } from './sections/problem/problem.component';
import { ApproachComponent } from './sections/approach/approach.component';
import { ForYouComponent } from './sections/for-you/for-you.component';
import { AboutComponent } from './sections/about/about.component';
import { ApplyComponent } from './sections/apply/apply.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    HeroComponent,
    ProblemComponent,
    ApproachComponent,
    ForYouComponent,
    AboutComponent,
    ApplyComponent,
  ],
  template: `
    <app-nav />
    <main>
      <app-hero />
      <app-problem />
      <app-approach />
      <app-for-you />
      <app-about />
      <app-apply />
    </main>
    <app-footer />
  `,
})
export class AppComponent {}

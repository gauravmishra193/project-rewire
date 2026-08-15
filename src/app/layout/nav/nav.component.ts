import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class.scrolled]="scrolled()">
      <a href="#hero" class="logo" aria-label="Project ReWire home">
        <svg class="logo-mark" width="30" height="38" viewBox="0 0 38 52" fill="none" aria-hidden="true">
          <path d="M5 5 L5 47" stroke="#C8F135" stroke-width="7.5" stroke-linecap="round"/>
          <path d="M5 5 L18 5 Q33 5 33 15 Q33 25 18 25 L5 25"
                stroke="#C8F135" stroke-width="7" fill="none"
                stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="5,25 20,25 14,37 27,37 21,49"
                    stroke="#C8F135" stroke-width="6.5" fill="none"
                    stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="logo-wordmark">Project ReWire</span>
      </a>
    </nav>
  `,
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 48);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <p>&copy; 2026 Project ReWire</p>
      <p>Built by a builder.</p>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}

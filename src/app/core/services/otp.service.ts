import { Injectable, signal } from '@angular/core';

declare const emailjs: { init(opts: object): void; send(...args: unknown[]): Promise<void> };

const PUBLIC_KEY  = 'xv7GvKeQCq6cgp4if';
const SERVICE_ID  = 'service_7j5dhfd';
const TEMPLATE_ID = 'template_tgwoqnu';
const TTL_MS      = 10 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class OtpService {
  readonly verified = signal(false);

  private code: string | null = null;
  private expiry = 0;

  constructor() {
    emailjs.init({ publicKey: PUBLIC_KEY });
  }

  async send(email: string): Promise<void> {
    this.code   = String(Math.floor(100000 + Math.random() * 900000));
    this.expiry = Date.now() + TTL_MS;
    const expTime = new Date(this.expiry).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      email,
      to_email: email,
      passcode: this.code,
      time: expTime,
    });
  }

  verify(entered: string): 'ok' | 'expired' | 'wrong' {
    if (!this.code)              return 'wrong';
    if (Date.now() > this.expiry) { this.code = null; return 'expired'; }
    if (entered !== this.code)   return 'wrong';
    this.verified.set(true);
    return 'ok';
  }

  reset(): void {
    this.code = null;
    this.expiry = 0;
    this.verified.set(false);
  }
}

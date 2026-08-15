import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const FORMSPREE_URL = 'https://formspree.io/f/mojzpkwo';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private http = inject(HttpClient);

  submit(data: Record<string, string>): Observable<unknown> {
    return this.http.post(FORMSPREE_URL, data, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('teslo-shop');
  private readonly _translocoService = inject(TranslocoService);

  constructor() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this._translocoService.setActiveLang(savedLang);
    }
    this._translocoService.langChanges$.subscribe(lang => {
      localStorage.setItem('lang', lang);
    });
  }
}

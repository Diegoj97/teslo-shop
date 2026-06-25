import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.services';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'front-navbar',
  imports: [RouterLinkActive, RouterLink, TranslocoPipe],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {

  authService = inject(AuthService);
  translocoService = inject(TranslocoService);

  public user = this.authService.user;
  public authStatus = this.authService.authStatus;

  public isAuthenticated = computed(() => this.authStatus() === 'authenticated');
  public activeLang = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  logout() {
    this.authService.logout();
  }

}

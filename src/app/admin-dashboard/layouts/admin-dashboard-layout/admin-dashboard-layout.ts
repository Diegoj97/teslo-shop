import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../auth/services/auth.services';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './admin-dashboard-layout.html',
  styles: ``,
})
export class AdminDashboardLayout {

  authService = inject(AuthService);
  translocoService = inject(TranslocoService);

  user = computed(() => this.authService.user());
  public activeLang = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  logout() {
    this.authService.logout();
  }

}


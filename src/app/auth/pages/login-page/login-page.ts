import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { strictEmailValidator } from '../../../shared/validators/email-validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public errorMessage = signal<string | null>(null);

  public loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, strictEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    console.log('Login form submitted:', this.loginForm.value);

    this._authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this._router.navigateByUrl('/')
      } else {
        this.errorMessage.set('Credenciales incorrectas. Por favor, revisa el correo y la contraseña.');
      }
    });
  }
}

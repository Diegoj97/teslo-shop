import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { strictEmailValidator } from '../../../shared/validators/email-validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public errorMessage = signal<string | null>(null);

  public registerForm: FormGroup = this._fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, strictEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    const { fullName, email, password } = this.registerForm.value;

    this._authService.registerUser(fullName, email, password).subscribe((isRegistered) => {
      if (isRegistered) {
        this._router.navigateByUrl('/');
      } else {
        this.errorMessage.set('Error al registrar usuario. Inténtalo de nuevo o comprueba tus datos.');
      }
    });
  }
}

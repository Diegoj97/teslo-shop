import { AbstractControl, ValidationErrors } from '@angular/forms';

// Patrón estricto para correos electrónicos (ejemplo: usuario@dominio.com)
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  
  if (!value) {
    return null; // Deja que Validators.required controle si está vacío
  }

  const isValid = emailPattern.test(value);

  return isValid ? null : { strictEmail: true };
}

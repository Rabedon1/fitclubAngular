import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cedulaEcuatorianaValidator(control: AbstractControl): ValidationErrors | null {
  const cedula = control.value;

  if (!cedula || cedula.length !== 10) {
    return { cedulaInvalida: true };
  }

  const region = parseInt(cedula.substring(0, 2), 10);
  if (region < 1 || region > 24) {
    return { cedulaInvalida: true };
  }

  const digits = cedula.split('').map(Number);
  const checkDigit = digits.pop();

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let num = digits[i];
    if (i % 2 === 0) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
  }

  const computedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === computedCheckDigit ? null : { cedulaInvalida: true };
}


export function soloLetrasValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(value) ? null : { soloLetras: true };
  };
}

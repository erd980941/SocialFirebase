import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

export function matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword').value;
      const confirmPassword = control.get('confirmPassword').value;
  
      if (newPassword !== confirmPassword) {
        return { passwordMismatch: true };
      }
  
      return null;
    };
  }
import { AbstractControl } from '@angular/forms';

export const validateWhitespace = (control: AbstractControl) => {
  let isWhitespace = (control.value || '').trim().length === 0;
  let isValid = !isWhitespace;

  return isValid ? null : { trimmed: true };
};

import { AbstractControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ValidationService } from '../helpers/form-helper';

@Component({
  selector: 'control-messages',
  template: `
    <div *ngIf="message !== null"></div>
  `
})
export class ControlMessages {
  message: string = '';
  @Input() control: AbstractControl | null = null;
  constructor() { }

  get errorMessage() {
    if (this.control) {
      for (let propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.touched
        ) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }

    return null;
  }
}
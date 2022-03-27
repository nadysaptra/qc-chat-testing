import { AbstractControl } from "@angular/forms";

interface Config {
    required: string;
    invalidEmailAddress: string;
    minlength: string;
}

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
        let config: Config = {
            required: 'Required',
            invalidEmailAddress: 'Invalid email address',
            minlength: `Minimum length ${validatorValue.requiredLength}`
        };
        switch (validatorName) {
            case 'required':
                return config.required
            case 'invalidEmailAddress':
                return config.invalidEmailAddress
            case 'minlength':
                return config.minlength
            default:
                break;
        }

        return '';
    }

    static emailValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        if (
            control.value.match(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            )
        ) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }
}

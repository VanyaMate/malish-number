import { MobileNumberOptions } from '../MobileNumber.type.ts';
import { MobileNumberValidator } from '../MobileNumberValidator.ts';
import { MobileNumberValidatorResponse } from '../MobileNumberValidator.type.ts';


export class RegexpMobileNumberValidator extends MobileNumberValidator {
    constructor (type: MobileNumberOptions) {
        super(type);
    }

    public validate (number: string): Promise<MobileNumberValidatorResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const regexp: RegExp = new RegExp(`^${this._formatPrefix(this._type.prefix)}\\d{${this._type.length}}$`);
                const valid: boolean = regexp.test(number);
                // условно
                if (valid) {
                    resolve({
                        valid  : true,
                        message: '',
                    });
                } else {
                    resolve({
                        valid  : false,
                        message: 'Номер не правильный',
                    });
                }
            }, 500);
        });
    }

    private _formatPrefix (prefix: string): string {
        return prefix.replace('+', '\\+');
    }
}
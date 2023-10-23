import { MobileNumberValidator } from '../MobileNumberValidator.ts';
import { MobileNumberValidatorResponse } from '../MobileNumberValidator.type.ts';


export class RegexpMobileNumberValidator extends MobileNumberValidator {
    public async validate (number: string): Promise<MobileNumberValidatorResponse> {
        const valid: boolean = new RegExp(`^${this._formatPrefix(this._type.prefix)}\d${this._type.length}$`).test(number);
        // условно
        if (valid) {
            return {
                valid  : true,
                message: '',
            };
        } else {
            return {
                valid  : false,
                message: 'Номер не правильный',
            };
        }
    }

    private _formatPrefix (prefix: string): string {
        return prefix.replace('+', '\\+');
    }
}
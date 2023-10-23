import { MobileNumber } from './MobileNumber.ts';
import {
    MobileNumberCallbackProps,
} from './MobileNumber.type.ts';
import { MobileNumberValidatorResponse } from './MobileNumberValidator.type.ts';


export class LocalMobileNumber extends MobileNumber {
    public clear (): Promise<MobileNumberCallbackProps> {
        this._number = '';
        return this._startEvents(this._getFull());
    }

    public async get (): Promise<MobileNumberCallbackProps> {
        const number: string                       = this._getFull();
        const valid: MobileNumberValidatorResponse = await this._validate(number);
        return {
            ...valid,
            number,
        };
    }

    public pop (): Promise<MobileNumberCallbackProps> {
        this._number = this._number.slice(0, this._number.length - 1);
        return this._startEvents(this._getFull());
    }

    public async push (digit: string | number): Promise<MobileNumberCallbackProps> {
        const valid: boolean = await this._validator.digit(digit);
        if (valid) {
            this._number += digit;
            return this._startEvents(this._getFull());
        }
        return {
            number : this._getFull(),
            valid  : false,
            message: '',
        };
    }
}
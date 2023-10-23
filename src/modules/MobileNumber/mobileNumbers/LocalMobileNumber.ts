import { MobileNumber } from '../MobileNumber.ts';
import {
    MobileNumberCallbackProps, MobileNumberOptions,
} from '../MobileNumber.type.ts';
import { IMobileNumberValidator } from '../MobileNumberValidator.interface.ts';


export class LocalMobileNumber extends MobileNumber {
    constructor (type: MobileNumberOptions, validator: IMobileNumberValidator) {
        super(type, validator);
    }

    public clear (): Promise<MobileNumberCallbackProps> {
        this._number = '';
        return this._startEvents(this._getFullNumber());
    }

    public pop (): Promise<MobileNumberCallbackProps> {
        this._number = this._number.slice(0, this._number.length - 1);
        return this._startEvents(this._getFullNumber());
    }

    public async push (digit: string | number): Promise<MobileNumberCallbackProps> {
        const valid: boolean = await this._validator.digit(digit);
        if (valid && this._number.length < this._options.length) {
            this._number += digit;
            return this._startEvents(this._getFullNumber());
        }
        return this._getFullData();
    }
}
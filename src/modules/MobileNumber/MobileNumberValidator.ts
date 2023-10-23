import { MobileNumberType } from './MobileNumber.type.ts';
import { IMobileNumberValidator } from './MobileNumberValidator.interface.ts';
import { MobileNumberValidatorResponse } from './MobileNumberValidator.type.ts';


export abstract class MobileNumberValidator implements IMobileNumberValidator {
    protected constructor (protected readonly _type: MobileNumberType) {
    }

    public async digit (number: string | number): Promise<boolean> {
        return /^\d$/.test(number.toString());
    }

    public abstract validate (number: string): Promise<MobileNumberValidatorResponse>;
}
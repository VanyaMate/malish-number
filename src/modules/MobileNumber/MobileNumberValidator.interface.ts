import { MobileNumberValidatorResponse } from './MobileNumberValidator.type.ts';


export interface IMobileNumberValidator {
    validate (number: string): Promise<MobileNumberValidatorResponse>;

    digit (number: string | number): Promise<boolean>;
}
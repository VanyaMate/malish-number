export interface IMobileNumberValidator {
    validate (number: string): Promise<boolean>;
}
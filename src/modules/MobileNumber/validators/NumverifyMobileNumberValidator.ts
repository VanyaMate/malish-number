import { IMobileNumberValidator } from '@/modules/MobileNumber/MobileNumberValidator.interface.ts';
import {
    MobileNumberValidatorResponse,
} from '@/modules/MobileNumber/MobileNumberValidator.type.ts';


export class NumverifyMobileNumberValidator implements IMobileNumberValidator {
    public validate (number: string): Promise<MobileNumberValidatorResponse> {
        return fetch('http://apilayer.net/api/validate?access_key=4633b2813a2ac343301a093d29079e56&number=' + number)
            .then((response) => response.json())
            .then(({ valid }) => ({
                valid, message: valid ? '' : 'Неверно введён номер',
            }));
    }

    public async digit (number: string | number): Promise<boolean> {
        return new RegExp(/^\d$/).test(number.toString());
    }
}

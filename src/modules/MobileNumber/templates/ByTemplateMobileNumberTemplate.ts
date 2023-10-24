import { IMobileNumberTemplate } from '../MobileNumberTemplate.interface.ts';


export class ByTemplateMobileNumberTemplate implements IMobileNumberTemplate {
    constructor (protected readonly _template: string) {
    }

    public async get (number: string): Promise<string> {
        let result: string         = '';
        let numberDigits: number[] = number.match(/\d/g)?.map(Number) ?? [];
        let numberIndex: number    = 0;

        for (let i = 0; i < this._template.length; i++) {
            const symbol: string = this._template[i];
            switch (symbol) {
                case '_':
                    result += numberDigits[numberIndex] ?? '_';
                    numberIndex++;
                    break;
                default:
                    result += symbol;
                    break;
            }
        }

        return result;
    }
}
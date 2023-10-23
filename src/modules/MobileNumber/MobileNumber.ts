import { IMobileNumber } from './MobileNumber.interface.ts';
import {
    MobileNumberCallback,
    MobileNumberCallbackProps,
    MobileNumberSubscribe, MobileNumberSubscribers, MobileNumberType,
} from './MobileNumber.type.ts';
import { IMobileNumberValidator } from './MobileNumberValidator.interface.ts';
import { MobileNumberValidatorResponse } from './MobileNumberValidator.type.ts';


export abstract class MobileNumber implements IMobileNumber {
    protected _number: string                       = '';
    protected _subscribers: MobileNumberSubscribers = {
        input: [],
        valid: [],
    };

    protected constructor (
        protected readonly _type: MobileNumberType,
        protected readonly _validator: IMobileNumberValidator,
    ) {
    }

    public abstract clear (): Promise<MobileNumberCallbackProps>;

    public abstract get (): Promise<MobileNumberCallbackProps>;

    public abstract pop (): Promise<MobileNumberCallbackProps>;

    public abstract push (digit: string | number): Promise<MobileNumberCallbackProps>;

    public subscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void {
        this._subscribers[type].push(callback);
    }


    public unsubscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void {
        this._subscribers[type] = this._subscribers[type].filter((item) => item !== callback);
    }

    protected _getFull (): string {
        return this._type.prefix + this._number;
    }

    protected _validate (number: string): Promise<MobileNumberValidatorResponse> {
        return this._validator.validate(number);
    }

    protected _event (type: MobileNumberSubscribe, props: MobileNumberCallbackProps): void {
        this._subscribers[type].forEach((callback) => callback(props));
    }

    protected _startEvents (number: string): Promise<MobileNumberCallbackProps> {
        this._event('input', {
            number : number,
            valid  : false,
            message: '',
        });

        return this._validate(number).then((response) => {
            const props: MobileNumberCallbackProps = {
                number: number,
                ...response,
            };

            this._event('valid', props);
            return props;
        });
    }
}
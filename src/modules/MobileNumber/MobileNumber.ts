import { IMobileNumber } from './MobileNumber.interface.ts';
import {
    MobileNumberCallback,
    MobileNumberCallbackProps,
    MobileNumberSubscribe, MobileNumberSubscribers, MobileNumberType,
} from './MobileNumber.type.ts';
import { IMobileNumberValidator } from './MobileNumberValidator.interface.ts';


export abstract class MobileNumber implements IMobileNumber {
    protected _state: string                        = '';
    protected _subscribers: MobileNumberSubscribers = {
        input  : [],
        invalid: [],
        change : [],
        valid  : [],
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

    public abstract subscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void;

    public abstract unsubscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void;
}
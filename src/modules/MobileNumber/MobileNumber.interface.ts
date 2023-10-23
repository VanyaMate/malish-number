import {
    MobileNumberCallback,
    MobileNumberCallbackProps,
    MobileNumberSubscribe,
} from './MobileNumber.type.ts';


export interface IMobileNumber {
    subscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void;

    unsubscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void;

    push (digit: string | number): Promise<MobileNumberCallbackProps>;

    pop (): Promise<MobileNumberCallbackProps>;

    clear (): Promise<MobileNumberCallbackProps>;

    get (): Promise<MobileNumberCallbackProps>;
}
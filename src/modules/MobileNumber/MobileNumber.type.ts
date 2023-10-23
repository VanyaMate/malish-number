export type MobileNumberSubscribe =
    'input' | 'change' | 'valid' | 'invalid';

export type MobileNumberType = {
    prefix: string;
    length: number;
}

export type MobileNumberSubscribers = {
    [key in MobileNumberSubscribe]: MobileNumberCallback[]
}

export type MobileNumberCallbackProps = {
    valid: boolean;
    message: string;
    value: string;
}

export type MobileNumberCallback =
    (props: MobileNumberCallbackProps) => any;
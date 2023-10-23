export type MobileNumberSubscribe =
    'input' | 'valid';

export type MobileNumberType = {
    prefix: string;
    length: number;
}

export type MobileNumberSubscribers = {
    [key in MobileNumberSubscribe]: MobileNumberCallback[];
}

export type MobileNumberCallbackProps = {
    valid: boolean;
    message: string;
    number: string;
}

export type MobileNumberCallback =
    (props: MobileNumberCallbackProps) => any;
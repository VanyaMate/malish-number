export type MobileNumberSubscribe =
    'init' | 'input' | 'valid';

export type MobileNumberOptions = {
    prefix: string;
    length: number;
    initialValue?: string;
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
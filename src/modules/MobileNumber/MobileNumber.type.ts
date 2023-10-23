export type MobileNumberSubscribe =
    'input' | 'change' | 'valid' | 'invalid';

export type MobileNumberCallbackProps = {
    valid: boolean;
    message: string;
    value: string;
}

export type MobileNumberCallback =
    (props: MobileNumberCallbackProps) => any;
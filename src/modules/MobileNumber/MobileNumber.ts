import { IMobileNumber } from './MobileNumber.interface.ts';
import {
    MobileNumberCallback,
    MobileNumberCallbackProps,
    MobileNumberSubscribe, MobileNumberSubscribers, MobileNumberOptions,
} from './MobileNumber.type.ts';
import { IMobileNumberValidator } from './MobileNumberValidator.interface.ts';
import { MobileNumberValidatorResponse } from './MobileNumberValidator.type.ts';


export abstract class MobileNumber implements IMobileNumber {
    protected _number: string                       = '';
    protected _valid: MobileNumberValidatorResponse = { valid: false, message: '' };
    protected _subscribers: MobileNumberSubscribers = {
        input: [],
        valid: [],
        init : [],
    };

    protected constructor (
        protected readonly _options: MobileNumberOptions,
        protected readonly _validator: IMobileNumberValidator,
    ) {
        this._number      = this._options.initialValue ?? '';
        this._subscribers = this._options.subscribers ?? this._subscribers;

        if (this._currentNumberIsFull()) {
            this._validator.validate(this._getFullNumber()).then((response) => {
                this._valid = response;
                this._event('init', this._getFullData());
            });
        } else {
            this._event('init', this._getFullData());
        }
    }

    public abstract clear (): Promise<MobileNumberCallbackProps>;

    public abstract pop (): Promise<MobileNumberCallbackProps>;

    public abstract push (digit: string | number): Promise<MobileNumberCallbackProps>;

    public get (): MobileNumberCallbackProps {
        return this._getFullData();
    }

    public subscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void {
        this._subscribers[type].push(callback);
    }


    public unsubscribe (type: MobileNumberSubscribe, callback: MobileNumberCallback): void {
        this._subscribers[type] = this._subscribers[type].filter((item) => item !== callback);
    }

    protected _getFullData (): MobileNumberCallbackProps {
        return {
            ...this._valid,
            number: this._getFullNumber(),
        };
    }

    protected _getFullNumber (): string {
        return this._options.prefix + this._number;
    }

    protected async _validate (number: string): Promise<MobileNumberValidatorResponse> {
        return this._validator.validate(number);
    }

    protected _event (type: MobileNumberSubscribe, props: MobileNumberCallbackProps): void {
        this._subscribers[type].forEach((callback) => callback(props));
    }

    protected async _startEvents (number: string): Promise<MobileNumberCallbackProps> {
        this._event('input', {
            ...this._getFullData(),
            number: number,
        });

        return this._currentNumberIsFull() ? this._validate(number).then((response) => {
            const props: MobileNumberCallbackProps = {
                number: number,
                ...response,
            };

            this._event('valid', props);
            return props;
        }) : this._getFullData();
    }

    protected _currentNumberIsFull (): boolean {
        return this._number.length === this._options.length;
    }
}
import Button from '@/components/_ui/_button/Button/Button.tsx';
import NumberKeyboard from '@/components/NumberKeyboard/NumberKeyboard.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MobileNumberView from '@/components/MobileNumberView/MobileNumberView.tsx';
import { IMobileNumber } from '@/modules/MobileNumber/MobileNumber.interface.ts';
import {
    MobileNumberCallbackProps,
    MobileNumberOptions,
} from '@/modules/MobileNumber/MobileNumber.type.ts';
import { LocalMobileNumber } from '@/modules/MobileNumber/mobileNumbers/LocalMobileNumber.ts';
import { IMobileNumberTemplate } from '@/modules/MobileNumber/MobileNumberTemplate.interface.ts';
import { IMobileNumberValidator } from '@/modules/MobileNumber/MobileNumberValidator.interface.ts';
import {
    ByTemplateMobileNumberTemplate,
} from '@/modules/MobileNumber/templates/ByTemplateMobileNumberTemplate.ts';
import {
    RegexpMobileNumberValidator,
} from '@/modules/MobileNumber/validators/RegexpMobileNumberValidator.ts';


const App = () => {
    const mobileNumberOptions: MobileNumberOptions = useMemo(() => {
        return {
            prefix: '+7',
            length: 10,
        };
    }, []);

    const mobileNumberValidator: IMobileNumberValidator = useMemo(() => {
        return new RegexpMobileNumberValidator(mobileNumberOptions);
    }, [ mobileNumberOptions ]);

    const mobileNumberModule: IMobileNumber = useMemo(
        () => {
            return new LocalMobileNumber(
                mobileNumberOptions,
                mobileNumberValidator,
            );
        },
        [ mobileNumberOptions, mobileNumberValidator ],
    );

    const mobileNumberTemplate: IMobileNumberTemplate = useMemo(() => {
        return new ByTemplateMobileNumberTemplate('+_ (___) ___-__-__');
    }, []);

    const [ currentNumber, setCurrentNumber ] = useState<string>('');
    const [ valid, setValid ]                 = useState<boolean>(false);
    const [ validMessage, setValidMessage ]   = useState<string>('');
    const [ validTest, setValidTest ]         = useState<boolean>(true);

    const onInit = useCallback((props: MobileNumberCallbackProps) => {
        setCurrentNumber(props.number);
        setValid(props.valid);
        setValidMessage(props.message);
        setValidTest(false);
    }, []);

    const onInput = useCallback((props: MobileNumberCallbackProps) => {
        setCurrentNumber(props.number);
        setValidTest(true);
    }, []);

    const onValid = useCallback((props: MobileNumberCallbackProps) => {
        setValid(props.valid);
        setValidMessage(props.message);
        if (props.number === currentNumber) {
            setValidTest(false);
        }
    }, [ currentNumber ]);

    const onKeydown = useCallback(async (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            await mobileNumberModule.pop();
        } else if (await mobileNumberValidator.digit(e.key)) {
            await mobileNumberModule.push(e.key);
        }
    }, []);

    useEffect(() => {
        mobileNumberModule.subscribe('init', onInit);
        mobileNumberModule.subscribe('input', onInput);
        mobileNumberModule.subscribe('valid', onValid);
        window.addEventListener('keydown', onKeydown);

        return () => {
            mobileNumberModule.unsubscribe('init', onInit);
            mobileNumberModule.unsubscribe('input', onInput);
            mobileNumberModule.unsubscribe('valid', onValid);
            window.removeEventListener('keydown', onKeydown);
        };
    }, [ currentNumber ]);

    const keyboardOnInput = useCallback((number: number) => {
        mobileNumberModule.push(number);
    }, [ mobileNumberModule ]);

    const keyboardOnClear = useCallback(() => {
        mobileNumberModule.clear();
    }, [ mobileNumberModule ]);

    const keyboardOnPop = useCallback(() => {
        mobileNumberModule.pop();
    }, [ mobileNumberModule ]);

    return (
        <div>
            [NUMBER]: { currentNumber }<br/>
            [VALID]: { valid.toString() }<br/>
            [VALID_MESSAGE]: { validMessage }<br/>
            [VALID_TESTING]: { validTest.toString() }<br/>
            <hr/>
            <NumberKeyboard
                onInput={ keyboardOnInput }
                onClear={ keyboardOnClear }
                onPop={ keyboardOnPop }
            />
            <hr/>
            <MobileNumberView template={ mobileNumberTemplate } number={ currentNumber }/>
            <hr/>
            <hr/>
        </div>
    );
};

export default App;
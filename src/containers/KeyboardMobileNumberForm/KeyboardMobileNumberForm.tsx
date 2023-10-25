import Button from '@/components/_ui/_button/Button/Button.tsx';
import Checkbox from '@/components/_ui/_input/Checkbox/Checkbox.tsx';
import MobileNumberView from '@/components/MobileNumberView/MobileNumberView.tsx';
import NumberKeyboard from '@/components/NumberKeyboard/NumberKeyboard.tsx';
import { cn } from '@/helpers/react/classname.helper.ts';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import css from './KeyboardMobileNumberForm.module.scss';


const KeyboardMobileNumberForm = () => {
    const mobileNumberOptions: MobileNumberOptions      = useMemo(() => {
        return {
            prefix: '+7',
            length: 10,
        };
    }, []);
    const mobileNumberValidator: IMobileNumberValidator = useMemo(() => {
        return new RegexpMobileNumberValidator(mobileNumberOptions);
    }, [ mobileNumberOptions ]);
    const mobileNumberModule: IMobileNumber             = useMemo(
        () => {
            return new LocalMobileNumber(
                mobileNumberOptions,
                mobileNumberValidator,
            );
        },
        [ mobileNumberOptions, mobileNumberValidator ],
    );
    const mobileNumberTemplate: IMobileNumberTemplate   = useMemo(() => {
        return new ByTemplateMobileNumberTemplate('+_(___)___-__-__');
    }, []);

    const [ currentNumber, setCurrentNumber ] = useState<string>('');
    const [ valid, setValid ]                 = useState<boolean>(false);
    const [ validMessage, setValidMessage ]   = useState<string>('');
    const [ validTest, setValidTest ]         = useState<boolean>(true);
    const validForm: boolean                  = useMemo(() => {
        return !validTest && valid;
    }, [ valid, validTest ]);

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
        <div className={ css.container }>
            <h2 className={ css.title }>Введите ваш номер мобильного телефона</h2>
            <MobileNumberView template={ mobileNumberTemplate } number={ currentNumber }
                              className={ validMessage && css.errorText }/>
            <p className={ css.desc }>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
            <NumberKeyboard
                onInput={ keyboardOnInput }
                onClear={ keyboardOnClear }
                onPop={ keyboardOnPop }
            />
            {
                validMessage
                ? <div
                    className={ cn(css.overbutton, css.error, css.errorText) }>{ validMessage }</div>
                : <Checkbox label={ 'Согласие на обработку персональных данных' }
                            onChange={ console.log }
                            className={ cn(css.checkbox, css.overbutton) }
                />
            }
            <Button className={ css.button } disabled={ !validForm }>Отправить</Button>
        </div>
    );
};

export default KeyboardMobileNumberForm;
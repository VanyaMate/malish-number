import Button from '@/components/_ui/_button/Button/Button.tsx';
import Checkbox from '@/components/_ui/_input/Checkbox/Checkbox.tsx';
import MobileNumberView from '@/components/MobileNumberView/MobileNumberView.tsx';
import NumberKeyboard from '@/components/NumberKeyboard/NumberKeyboard.tsx';
import css
    from '@/containers/KeyboardNumberFormWithMobileModule/KeyboardNumberFormWithMobileModule.module.scss';
import { cn } from '@/helpers/react/classname.helper.ts';
import { IMobileNumber } from '@/modules/MobileNumber/MobileNumber.interface.ts';
import { MobileNumberCallbackProps } from '@/modules/MobileNumber/MobileNumber.type.ts';
import { IMobileNumberTemplate } from '@/modules/MobileNumber/MobileNumberTemplate.interface.ts';
import React, { useCallback, useEffect, useMemo, useState } from 'react';


export type KeyboardMobileNumberFormProps = {
    mobileModule: IMobileNumber,
    template: IMobileNumberTemplate,
}

const KeyboardMobileNumberForm: React.FC<KeyboardMobileNumberFormProps> = (props) => {
    const { mobileModule, template }          = props;
    const [ currentNumber, setCurrentNumber ] = useState<string>('');
    const [ valid, setValid ]                 = useState<boolean>(false);
    const [ validMessage, setValidMessage ]   = useState<string>('');
    const [ validTest, setValidTest ]         = useState<boolean>(true);
    const validForm: boolean                  = useMemo(() => {
        return !validTest && valid;
    }, [ valid, validTest ]);
    const showError: boolean                  = useMemo(() => {
        return !validTest && !valid && (currentNumber.length === 12);
    }, [ valid, validTest, currentNumber ]);


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
            await mobileModule.pop();
        } else {
            switch (e.key) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    await mobileModule.push(e.key);
                    break;
            }
        }
    }, []);

    useEffect(() => {
        mobileModule.subscribe('init', onInit);
        mobileModule.subscribe('input', onInput);
        mobileModule.subscribe('valid', onValid);
        window.addEventListener('keydown', onKeydown);

        return () => {
            mobileModule.unsubscribe('init', onInit);
            mobileModule.unsubscribe('input', onInput);
            mobileModule.unsubscribe('valid', onValid);
            window.removeEventListener('keydown', onKeydown);
        };
    }, [ currentNumber ]);

    const keyboardOnInput = useCallback((number: number) => {
        mobileModule.push(number);
    }, [ mobileModule ]);

    const keyboardOnClear = useCallback(() => {
        mobileModule.clear();
    }, [ mobileModule ]);

    const keyboardOnPop = useCallback(() => {
        mobileModule.pop();
    }, [ mobileModule ]);

    return (
        <div className={ css.container }>
            <h2 className={ css.title }>Введите ваш номер мобильного телефона</h2>
            <MobileNumberView template={ template } number={ currentNumber }
                              className={ cn(showError && css.errorText) }/>
            <p className={ css.desc }>и с Вами свяжется наш менеждер для дальнейшей консультации</p>
            <NumberKeyboard
                onInput={ keyboardOnInput }
                onClear={ keyboardOnClear }
                onPop={ keyboardOnPop }
            />
            {
                showError
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
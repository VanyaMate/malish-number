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
    onSubmit: (number: string) => Promise<any>;
    disableKeyboard?: boolean;
}

const KeyboardMobileNumberForm: React.FC<KeyboardMobileNumberFormProps> = (props) => {
    const { mobileModule, template, onSubmit, disableKeyboard } = props;
    const [ currentNumber, setCurrentNumber ]                   = useState<string>('');
    const [ valid, setValid ]                                   = useState<boolean>(false);
    const [ validMessage, setValidMessage ]                     = useState<string>('');
    const [ validTest, setValidTest ]                           = useState<boolean>(true);
    const [ loading, setLoading ]                               = useState<boolean>(false);
    const [ checkedAgreement, setCheckedAgreement ]             = useState<boolean>(false);
    const validForm: boolean                                    = useMemo(() => {
        return !validTest && valid && checkedAgreement;
    }, [ valid, validTest, checkedAgreement ]);
    const showError: boolean                                    = useMemo(() => {
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

    const onSubmitHandler = useCallback(() => {
        setLoading(true);
        onSubmit(currentNumber)
            .finally(() => setLoading(false));
    }, []);

    const onKeydown = useCallback(async (e: KeyboardEvent) => {
        if (disableKeyboard) return;

        if (e.key === 'Backspace') {
            await mobileModule.pop();
        } else if (new RegExp(/^\d$/).test(e.key)) {
            await mobileModule.push(e.key);
        }
    }, [ disableKeyboard ]);

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
    }, [ currentNumber, mobileModule, onKeydown ]);

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
                            onChange={ setCheckedAgreement }
                            className={ cn(css.checkbox, css.overbutton) }
                            initialState={ checkedAgreement }
                />
            }
            <Button
                className={ css.button }
                disabled={ !validForm }
                loading={ loading }
                onClick={ onSubmitHandler }
            >
                Отправить
            </Button>
        </div>
    );
};

export default React.memo(KeyboardMobileNumberForm);
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IMobileNumber } from './modules/MobileNumber/MobileNumber.interface.ts';
import {
    MobileNumberCallbackProps,
    MobileNumberOptions,
} from './modules/MobileNumber/MobileNumber.type.ts';
import { LocalMobileNumber } from './modules/MobileNumber/mobileNumbers/LocalMobileNumber.ts';
import {
    RegexpMobileNumberValidator,
} from './modules/MobileNumber/validators/RegexpMobileNumberValidator.ts';


const App = () => {
    const number: IMobileNumber = useMemo(
        () => {
            const type: MobileNumberOptions = {
                prefix: '+7',
                length: 10,
            };
            return new LocalMobileNumber(
                type,
                new RegexpMobileNumberValidator(type),
            );
        },
        [],
    );

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

    useEffect(() => {
        number.subscribe('init', onInit);
        number.subscribe('input', onInput);
        number.subscribe('valid', onValid);

        return () => {
            number.unsubscribe('init', onInit);
            number.unsubscribe('input', onInput);
            number.unsubscribe('valid', onValid);
        };
    }, [ currentNumber ]);

    return (
        <div>
            [NUMBER]: { currentNumber }<br/>
            [VALID]: { valid.toString() }<br/>
            [VALID_MESSAGE]: { validMessage }<br/>
            [VALID_TESTING]: { validTest.toString() }<br/>
            <hr/>
            <button style={ { padding: 5 } } onClick={ () => number.push(0) }>0</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(1) }>1</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(2) }>2</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(3) }>3</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(4) }>4</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(5) }>5</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(6) }>6</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(7) }>7</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(8) }>8</button>
            <button style={ { padding: 5 } } onClick={ () => number.push(9) }>9</button>
            <button style={ { padding: 5 } } onClick={ () => number.clear() }>CLEAR</button>
            <button style={ { padding: 5 } } onClick={ () => number.pop() }>POP</button>
            <hr/>
            <hr/>
            <hr/>
        </div>
    );
};

export default App;
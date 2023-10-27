import Button from '@/components/_ui/_button/Button/Button.tsx';
import { cn } from '@/helpers/react/classname.helper.ts';
import React from 'react';
import css from './NumberKeyboard.module.scss';


export type NumberKeyboardProps = {
    onInput: (number: number) => any;
    onClear: () => any;
    onPop: () => any;
}

const NumberKeyboard: React.FC<NumberKeyboardProps> = (props) => {
    const { onInput, onClear } = props;

    return (
        <div className={ css.container }>
            <div className={ cn(css.row, css.simple) }>
                <Button onClick={ () => onInput(1) }>1</Button>
                <Button onClick={ () => onInput(2) }>2</Button>
                <Button onClick={ () => onInput(3) }>3</Button>
            </div>
            <div className={ cn(css.row, css.simple) }>
                <Button onClick={ () => onInput(4) }>4</Button>
                <Button onClick={ () => onInput(5) }>5</Button>
                <Button onClick={ () => onInput(6) }>6</Button>
            </div>
            <div className={ cn(css.row, css.simple) }>
                <Button onClick={ () => onInput(7) }>7</Button>
                <Button onClick={ () => onInput(8) }>8</Button>
                <Button onClick={ () => onInput(9) }>9</Button>
            </div>
            <div className={ cn(css.row, css.bottom) }>
                <Button onClick={ () => onClear() }>Очистить</Button>
                <Button onClick={ () => onInput(0) }>0</Button>
            </div>
        </div>
    );
};

export default React.memo(NumberKeyboard);
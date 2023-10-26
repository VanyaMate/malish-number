import React from 'react';
import { cn } from '@/helpers/react/classname.helper.ts';
import css from './Button.module.scss';


export type ButtonProps = {
    primary?: boolean;
    loading?: boolean;
    disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
    const { primary, loading, className, disabled, ...other } = props;

    return (
        <button { ...other }
                className={ cn(className, css.container, primary && css.primary, disabled && css.disabled) }/>
    );
};

export default React.memo(Button);
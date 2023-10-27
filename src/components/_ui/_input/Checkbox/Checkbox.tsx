import { cn } from '@/helpers/react/classname.helper.ts';
import React, { useCallback, useState } from 'react';
import css from './Checkbox.module.scss';


export type CheckboxProps = {
    onChange: (value: boolean) => any;
    label: string;
    className?: string;
    initialState?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { onChange, label, className, initialState } = props;
    const [ status, setStatus ]                        = useState<boolean>(initialState ?? false);

    const onClickHandler = useCallback(() => {
        onChange(!status);
        setStatus((prev) => !prev);
    }, [ status ]);

    return (
        <div className={ cn(css.container, className) } onClick={ onClickHandler }>
            <div className={ cn(css.box, status && css.checked) }>
                <div className={ css.mark }>✓</div>
            </div>
            <div className={ css.label }>
                { label }
            </div>
        </div>
    );
};

export default React.memo(Checkbox);
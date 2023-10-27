import { cn } from '@/helpers/react/classname.helper.ts';
import React from 'react';
import css from './SidePopup.module.scss';


export type SidePopupProps = {
    children: React.ReactNode;
    opened: boolean;
}

const SidePopup: React.FC<SidePopupProps> = (props) => {
    const { children, opened } = props;

    return (
        <div className={ cn(css.container, !opened && css.closed) }>
            <div className={ css.content }> { children }</div>
        </div>
    );
};

export default React.memo(SidePopup);
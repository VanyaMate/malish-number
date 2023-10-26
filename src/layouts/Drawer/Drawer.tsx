import Button from '@/components/_ui/_button/Button/Button.tsx';
import { cn } from '@/helpers/react/classname.helper.ts';
import React from 'react';
import css from './Drawer.module.scss';


export type DrawerProps = {
    children: React.ReactNode;
    opened: boolean;
    onClose: () => any;
}

const Drawer: React.FC<DrawerProps> = (props) => {
    const { children, opened, onClose } = props;

    return (
        <div className={ cn(css.container, !opened && css.closed) }>
            <div className={ css.background } onClick={ onClose }/>
            <div className={ css.content }>
                { children }
            </div>
            <Button className={ css.closeButton } onClick={ onClose }>X</Button>
        </div>
    );
};

export default Drawer;
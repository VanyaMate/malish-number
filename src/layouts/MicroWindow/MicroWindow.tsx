import { cn } from '@/helpers/react/classname.helper.ts';
import React from 'react';
import css from './MicroWindow.module.scss';


const MicroWindow: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { className, ...other } = props;

    return (
        <div { ...other } className={ cn(className, css.container) }/>
    );
};

export default MicroWindow;
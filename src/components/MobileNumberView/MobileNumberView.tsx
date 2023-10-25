import { cn } from '@/helpers/react/classname.helper.ts';
import React, { useEffect, useState } from 'react';
import {
    IMobileNumberTemplate,
} from '@/modules/MobileNumber/MobileNumberTemplate.interface.ts';
import css from './MobileNumberView.module.scss';


export type MobileNumberViewProps = {
    template: IMobileNumberTemplate;
    number: string;
    className?: string;
};

const MobileNumberView: React.FC<MobileNumberViewProps> = (props) => {
    const { template, number, className } = props;
    const [ value, setValue ]             = useState<string>('');

    useEffect(() => {
        template.get(number).then(setValue);
    }, [ number ]);

    return (
        <div className={ cn(css.container, className) }>
            { value }
        </div>
    );
};

export default React.memo(MobileNumberView);
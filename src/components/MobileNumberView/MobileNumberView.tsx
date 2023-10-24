import React, { useEffect, useState } from 'react';
import {
    IMobileNumberTemplate,
} from '../../modules/MobileNumber/MobileNumberTemplate.interface.ts';


export type MobileNumberViewProps = {
    template: IMobileNumberTemplate;
    number: string;
}

const MobileNumberView: React.FC<MobileNumberViewProps> = (props) => {
    const { template, number } = props;
    const [ value, setValue ]  = useState<string>('');

    useEffect(() => {
        template.get(number).then(setValue);
    }, [ number ]);

    return (
        <div>
            [TEMPLATE]: { value }
        </div>
    );
};

export default React.memo(MobileNumberView);
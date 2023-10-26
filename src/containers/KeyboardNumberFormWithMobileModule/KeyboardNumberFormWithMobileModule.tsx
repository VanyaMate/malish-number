import KeyboardMobileNumberForm
    from '@/components/KeyboardMobileNumberForm/KeyboardMobileNumberForm.tsx';
import { IMobileNumber } from '@/modules/MobileNumber/MobileNumber.interface.ts';
import { MobileNumberOptions } from '@/modules/MobileNumber/MobileNumber.type.ts';
import { LocalMobileNumber } from '@/modules/MobileNumber/mobileNumbers/LocalMobileNumber.ts';
import { IMobileNumberTemplate } from '@/modules/MobileNumber/MobileNumberTemplate.interface.ts';
import { IMobileNumberValidator } from '@/modules/MobileNumber/MobileNumberValidator.interface.ts';
import {
    ByTemplateMobileNumberTemplate,
} from '@/modules/MobileNumber/templates/ByTemplateMobileNumberTemplate.ts';
import {
    RegexpMobileNumberValidator,
} from '@/modules/MobileNumber/validators/RegexpMobileNumberValidator.ts';
import React, { useMemo } from 'react';


const KeyboardNumberFormWithMobileModule = () => {
    const mobileNumberOptions: MobileNumberOptions      = useMemo(() => {
        return {
            prefix: '+7',
            length: 10,
        };
    }, []);
    const mobileNumberValidator: IMobileNumberValidator = useMemo(() => {
        return new RegexpMobileNumberValidator(mobileNumberOptions);
    }, [ mobileNumberOptions ]);
    const mobileNumberModule: IMobileNumber             = useMemo(
        () => {
            return new LocalMobileNumber(
                mobileNumberOptions,
                mobileNumberValidator,
            );
        },
        [ mobileNumberOptions, mobileNumberValidator ],
    );
    const mobileNumberTemplate: IMobileNumberTemplate   = useMemo(() => {
        return new ByTemplateMobileNumberTemplate('+_(___)___-__-__');
    }, []);

    return (
        <KeyboardMobileNumberForm
            mobileModule={ mobileNumberModule }
            template={ mobileNumberTemplate }
        />
    );
};

export default React.memo(KeyboardNumberFormWithMobileModule);
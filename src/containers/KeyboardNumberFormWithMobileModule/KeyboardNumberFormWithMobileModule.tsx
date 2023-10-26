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
import React, { useCallback, useMemo } from 'react';


export type KeyboardNumberFormWithMobileModuleProps = {
    disableKeyboard?: boolean;
}

const KeyboardNumberFormWithMobileModule: React.FC<KeyboardNumberFormWithMobileModuleProps> = (props) => {
    const { disableKeyboard }                           = props;
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

    const sendNumber = useCallback((number: string) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log('number send', number);
                resolve();
            }, 1000);
        });
    }, []);

    return (
        <KeyboardMobileNumberForm
            mobileModule={ mobileNumberModule }
            template={ mobileNumberTemplate }
            onSubmit={ sendNumber }
            disableKeyboard={ disableKeyboard }
        />
    );
};

export default React.memo(KeyboardNumberFormWithMobileModule);
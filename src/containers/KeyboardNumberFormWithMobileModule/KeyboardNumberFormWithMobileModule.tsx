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
    NumverifyMobileNumberValidator,
} from '@/modules/MobileNumber/validators/NumverifyMobileNumberValidator.ts';
import {
    RegexpMobileNumberValidator,
} from '@/modules/MobileNumber/validators/RegexpMobileNumberValidator.ts';
import React, { useCallback, useMemo, useState } from 'react';
import css from './KeyboardNumberFormWithMobileModule.module.scss';


export type KeyboardNumberFormWithMobileModuleProps = {
    disableKeyboard?: boolean;
}

const KeyboardNumberFormWithMobileModule: React.FC<KeyboardNumberFormWithMobileModuleProps> = (props) => {
    const { disableKeyboard }                      = props;
    const mobileNumberOptions: MobileNumberOptions = useMemo(() => {
        return {
            prefix: '+7',
            length: 10,
        };
    }, []);
    /*    const mobileNumberValidator: IMobileNumberValidator = useMemo(() => {
     return new RegexpMobileNumberValidator(mobileNumberOptions);
     }, [ mobileNumberOptions ]);*/

    const mobileNumberValidator: IMobileNumberValidator = useMemo(() => {
        return new NumverifyMobileNumberValidator();
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
    const [ successSended, setSuccessSended ]           = useState<boolean>(false);

    const sendNumber = useCallback(() => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setSuccessSended(true);
                resolve();
            }, 1000);
        });
    }, []);

    if (successSended) {
        return (
            <div className={ css.container }>
                <h2 className={ css.title }>ЗАЯВКА ПРИНЯТА</h2>
                <p className={ css.desc }>Держите телефон под рукой. Скоро с Вами свяжется наш
                    менеджер. </p>
            </div>
        );
    }

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
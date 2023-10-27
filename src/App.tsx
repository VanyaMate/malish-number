import SidePopupQR from '@/components/SidePopupQR/SidePopupQR.tsx';
import KeyboardNumberFormWithMobileModule
    from '@/containers/KeyboardNumberFormWithMobileModule/KeyboardNumberFormWithMobileModule.tsx';
import Drawer from '@/layouts/Drawer/Drawer.tsx';
import MicroWindow from '@/layouts/MicroWindow/MicroWindow.tsx';
import { useState } from 'react';


const App = () => {
    const [ opened, setOpened ] = useState<boolean>(false);

    return (
        <div style={ {
            height        : '100vh',
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center',
        } }>
            <MicroWindow
                style={ {
                    backgroundImage: 'url("/malish-background.png")',
                    backgroundSize : 'cover',
                } }>
                <SidePopupQR
                    title={ 'ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ!' }
                    opened={ !opened }
                    onOk={ () => setOpened(true) }
                    qr={ '/fake-qr.png' }
                />
                <Drawer opened={ opened } onClose={ () => setOpened(false) }>
                    <KeyboardNumberFormWithMobileModule
                        disableKeyboard={ !opened }
                    />
                </Drawer>
            </MicroWindow>
        </div>
    );
};

export default App;
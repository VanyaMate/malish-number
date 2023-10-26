import Button from '@/components/_ui/_button/Button/Button.tsx';
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
            <div style={ {
                border      : '2px dotted rgba(0, 0, 0, .2)',
                borderRadius: '10px',
                padding     : 20,
            } }>
                <MicroWindow
                    style={ {
                        backgroundImage: 'url(https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-phoenix-bird-in-flames-wallpapers-wallpapershd-image_2697352.jpg)',
                        backgroundSize : 'cover',
                    } }>
                    <Button onClick={ () => setOpened(true) }>Open</Button>
                    <Drawer opened={ opened } onClose={ () => setOpened(false) }>
                        <KeyboardNumberFormWithMobileModule/>
                    </Drawer>
                </MicroWindow>
            </div>
        </div>
    );
};

export default App;
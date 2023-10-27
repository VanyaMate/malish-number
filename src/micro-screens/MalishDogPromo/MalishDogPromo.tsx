import BackgroundYoutubeVideo from '@/components/BackgroundYoutubeVideo/BackgroundYoutubeVideo.tsx';
import SidePopupQR from '@/components/SidePopupQR/SidePopupQR.tsx';
import KeyboardNumberFormWithMobileModule
    from '@/containers/KeyboardNumberFormWithMobileModule/KeyboardNumberFormWithMobileModule.tsx';
import Drawer from '@/layouts/Drawer/Drawer.tsx';
import MicroWindow from '@/layouts/MicroWindow/MicroWindow.tsx';
import React, { useEffect, useMemo, useState } from 'react';
import css from './MalishDogPromo.module.scss';


const MalishDogPromo = () => {
    const [ opened, setOpened ]     = useState<boolean>(false);
    const [ showTime, setShowTime ] = useState<boolean>(false);
    const showSidePopup             = useMemo(() => {
        return !opened && showTime;
    }, [ opened, showTime ]);

    useEffect(() => {
        setTimeout(() => {
            setShowTime(true);
        }, 2000);
    }, []);

    return (
        <MicroWindow
            style={ {
                backgroundImage: 'url("/malish-background.png")',
                backgroundSize : 'cover',
            } }
            className={ css.container }
        >
            <BackgroundYoutubeVideo playing={ !opened }
                                    url={ 'https://www.youtube.com/watch?v=HOfTBFQz6oo' }/>
            <SidePopupQR
                title={ 'ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ!' }
                opened={ showSidePopup }
                onOk={ () => setOpened(true) }
                qr={ '/fake-qr.png' }
            />
            <Drawer opened={ opened } onClose={ () => setOpened(false) }>
                <KeyboardNumberFormWithMobileModule
                    disableKeyboard={ !opened }
                />
            </Drawer>
        </MicroWindow>
    );
};

export default React.memo(MalishDogPromo);
import Button from '@/components/_ui/_button/Button/Button.tsx';
import SidePopup from '@/layouts/SidePopup/SidePopup.tsx';
import React from 'react';
import css from './SidePopupQR.module.scss';


export type SidePopupQRProps = {
    title: string;
    qr: string;
    onOk: () => any;
    opened: boolean;
}

const SidePopupQR: React.FC<SidePopupQRProps> = (props) => {
    const { title, qr, opened, onOk } = props;

    return (
        <SidePopup opened={ opened }>
            <div className={ css.container }>
                <h2 className={ css.title }>{ title }</h2>
                <img className={ css.qr } src={ qr } alt={ title }/>
                <p className={ css.text }>Сканируйте QR-код или нажмите ОК</p>
                <Button className={ css.button } primary onClick={ onOk }>ОК</Button>
            </div>
        </SidePopup>
    );
};

export default SidePopupQR;
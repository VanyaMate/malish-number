import KeyboardMobileNumberForm
    from '@/containers/KeyboardMobileNumberForm/KeyboardMobileNumberForm.tsx';
import MicroWindow from '@/layouts/MicroWindow/MicroWindow.tsx';


const App = () => {
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
                <MicroWindow>
                    <KeyboardMobileNumberForm/>
                </MicroWindow>
            </div>
        </div>
    );
};

export default App;
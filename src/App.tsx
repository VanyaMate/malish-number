import MalishDogPromo from '@/micro-screens/MalishDogPromo/MalishDogPromo.tsx';


const App = () => {
    return (
        <div style={ {
            height        : '100vh',
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center',
        } }>
            <MalishDogPromo/>
        </div>
    );
};

export default App;
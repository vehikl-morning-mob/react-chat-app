import React, {useEffect, useState} from 'react';
import './App.css';
import {Login} from './components/login';
import {Chat} from './components/Chat';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(!!window.localStorage.getItem('token'));
        const onLoggedIn = () => setIsLoggedIn(true);
        window.addEventListener('logged-in', onLoggedIn);

        return () => window.removeEventListener('logged-in', onLoggedIn);
    }, []);

    return (
        <div className="chatApp">
            {isLoggedIn ? <Chat/> : <Login/>}
        </div>
    );
}

export default App;

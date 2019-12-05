import React, {useState} from 'react';
import {login} from '../services/login';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        await login(email, password);
    }

    return <form>
        <input type="email"
               value={email}
               onChange={event => setEmail(event.target.value)}/>

        <input type="password"
               value={password}
               onChange={event => setPassword(event.target.value)}/>

        <button type="submit"
                onClick={handleSubmit}>
            Submit
        </button>
    </form>;
}

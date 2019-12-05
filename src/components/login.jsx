import React, {useState} from 'react';
import {login} from '../services/login';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange(event) {
        event.persist();
        switch (event.target.name) {
            case 'email':
                return setEmail(event.target.value);
            case 'password':
                return setPassword(event.target.value);
            default:
                throw new Error('Oh oh!');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await login(email, password);
    }

    return <form>
        <input type="email" data-testid="email-field" name="email" value={email} onChange={handleInputChange}/>
        <input type="password" name="password"
               data-testid="password-field"
               value={password}
               onChange={handleInputChange}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>;
}

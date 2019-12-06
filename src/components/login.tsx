import React, {ChangeEvent, useState, MouseEvent} from 'react';
import {login} from '../services/login';

export function Login() {
    const [inputs, setInputs] = useState({email: '', password: ''});

    async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        await login(inputs.email, inputs.password);
    }

    function handleChange(event: ChangeEvent) {
        event.persist();
        const target = event.target as HTMLInputElement;
        setInputs({
            ...inputs, [target.name]: target.value
        });
    }

    return <form>
        <input type="email"
               name="email"
               value={inputs.email}
               onChange={handleChange}/>

        <input type="password"
               name="password"
               value={inputs.password}
               onChange={handleChange}/>

        <button type="submit"
                onClick={handleSubmit}>
            Submit
        </button>
    </form>;
}

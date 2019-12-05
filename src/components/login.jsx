import React, {useState} from 'react';
import {login} from '../services/login';

export function Login() {
    const [inputs, setInputs] = useState({email: '', password: ''});

    async function handleSubmit(event) {
        event.preventDefault();
        await login(inputs.email, inputs.password);
    }

    function handleChange(event) {
        event.persist();
        setInputs({...inputs, [event.target.name]: event.target.value});
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

import React from 'react';

export function Login() {
    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return <form>
        <input type="text" className="email-address"/>
        <input type="password" className="password-field"/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>;
}

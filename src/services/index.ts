import axios from 'axios';

export async function login(email: string, password: string) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {email, password});
        window.localStorage.setItem('token', response.data.access_token);
        window.dispatchEvent(new Event('logged-in'));
    } catch (e) {
        alert('Failed to login. Please refresh the page.');
    }
}

export async function postMessage(message: string) {
    try {
        await axios.post('http://127.0.0.1:8000/api/messages', {message}, {
            headers: {
                Authorization: `bearer ${window.localStorage.getItem('token')}`
            }
        })
    } catch (e) {
        alert('Failed to submit new message');
    }
}

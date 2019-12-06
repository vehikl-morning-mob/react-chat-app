import axios from 'axios';

export async function login(email: string, password: string) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {email, password});
        window.localStorage.setItem('token', response.data.access_token);
    } catch (e) {
        alert('Failed to login. Please refresh the page.');
    }
}

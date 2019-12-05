import axios from 'axios';

export async function login(email, password) {
    try {
        await axios.post('http://127.0.0.1:8000/api/auth/login', {email, password});
    } catch (e) {
        //
    }
}

import axios from 'axios';

export async function login(email, password) {
    try {
        await axios.post('localhost:8000/login', {email, password});
    } catch (e) {
        //
    }
}

import axios from './axios';
import {Message} from "../types/backend";

export async function login(email: string, password: string) {
    try {
        const response = await axios.post('api/auth/login', {email, password});
        window.localStorage.setItem('token', response.data.access_token);
        window.dispatchEvent(new Event('logged-in'));
    } catch (e) {
        alert('Failed to login. Please refresh the page.');
    }
}

export async function postMessage(message: string) {
    try {
        await axios.post('api/messages', {content: message}, {
            headers: {
                Authorization: `bearer ${window.localStorage.getItem('token')}`
            }
        })
    } catch (e) {
        alert('Failed to submit new message');
    }
}

export async function getMessages(): Promise<Message[]> {
    try {
        const response = await axios.get<Message[]>('api/messages', {
            headers: {
                Authorization: `bearer ${window.localStorage.getItem('token')}`
            }
        });

        return response.data;
    } catch (e) {
        alert('Failed to GET messages');
    }
    return [];
}

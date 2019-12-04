import {login} from './login';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('login service', () => {
    it('Provides the proper payload to the login endpoint', async () => {
        const mockAdapter = new MockAdapter(axios);
        const credentials = {
            email: 'Foobar@buzzfizz.com',
            password: 'Foobar'
        };

        mockAdapter.onPost('/login');

        await login(credentials.email, credentials.password);

        expect(JSON.parse(mockAdapter.history.post[0].data)).toEqual(credentials);
    });
});

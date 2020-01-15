import {login} from './index';
import MockAdapter from 'axios-mock-adapter';
import axios from './axios';

const accessToken = '1231231231231241';

describe('login service', () => {
    let mockAdapter: MockAdapter;
    beforeEach(() => {
        mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('api/auth/login').reply(200, {
            'access_token': accessToken,
            'token_type': 'bearer',
            'expires_in': 3600
        });
    });
    afterEach(() => {
        mockAdapter.restore();
    });

    it('Provides the proper payload to the login endpoint', async () => {
        const credentials = {
            email: 'Foobar@buzzfizz.com',
            password: 'Foobar'
        };

        await login(credentials.email, credentials.password);

        expect(JSON.parse(mockAdapter.history.post[0].data)).toEqual(credentials);
    });

    it('stores the given token to local storage', async () => {
        const credentials = {
            email: 'Foobar@buzzfizz.com',
            password: 'Foobar'
        };

        await login(credentials.email, credentials.password);

        expect(window.localStorage.getItem('token')).toEqual(accessToken);
    });
});

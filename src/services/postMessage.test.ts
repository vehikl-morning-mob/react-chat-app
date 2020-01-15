import {postMessage} from './index';
import MockAdapter from 'axios-mock-adapter';
import axios from './axios';

describe('PostMessage', () => {
    let mockAdapter: MockAdapter;
    beforeEach(() => {
        mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('api/messages').reply(201);
    });
    afterEach(() => {
        mockAdapter.restore();
    });

    it('Provides the proper payload to the postMessage endpoint', async () => {
        const message: string = "hello";

        await postMessage(message);

        expect(JSON.parse(mockAdapter.history.post[0].data)).toEqual({content: message});
    });

    it('Uses the bearer token from local storage in the requests', async () => {
        const message: string = "hello";
        const token = 'token123';
        window.localStorage.setItem('token', token);

        await postMessage(message);

        expect(mockAdapter.history.post[0].headers.Authorization).toEqual(`bearer ${token}`);
    });

});

import {getMessages} from "./index";
import MockAdapter from "axios-mock-adapter";
import axios from './axios';
import {Message} from "../types/backend";

describe('Get Messages', () => {
    let mockAdapter: MockAdapter;
    const message1: Message = {user: 'user1', message: 'message1'};
    const message2: Message = {user: 'user2', message: 'message2'};

    beforeEach(() => {
        mockAdapter = new MockAdapter(axios);
        mockAdapter.onGet('api/messages').reply(200, [message1, message2])
    });

    afterEach(() => {
        mockAdapter.restore();
    });

    it('retrieves existing messages', async () => {
        const messages = await getMessages();


        expect(messages).toEqual([message1, message2]);
    });
});

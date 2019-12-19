import React from 'react';
import {render, wait} from "@testing-library/react";
import {ChatHistory} from "./ChatHistory";
import {act} from "react-dom/test-utils";
import flushPromises from "flush-promises";
import {GetAllMessagesResponse} from "../types/backend";
import MockEcho from 'mock-echo'


jest.mock('../services');
const getMessages = require("../services").getMessages as jest.Mock;

describe("ChatHistory", () => {
    let mockEcho: MockEcho;

    beforeEach(() => {
        mockEcho = new MockEcho()
        window.Echo = mockEcho
        // @ts-ignore
        global.Echo = mockEcho
    });

    afterEach(() => {
        delete window.Echo
        // @ts-ignore
        delete global.Echo
    })

    it("Shows existing messages on load", async () => {
        const messages = [
            {user: 'user1', message: 'message1'},
        ];

        getMessages.mockResolvedValue(messages);

        let getByText;

        await act(async () => {
            getByText = await render(<ChatHistory/>).getByText;
            await wait();
        });

        expect(getByText(`${messages[0].user}: ${messages[0].message}`)).toBeTruthy();
    });
    it('displays new messages when they are received', async () => {
        getMessages.mockResolvedValue([]);

        let getByText;
        const message = {
            user: 'user1',
            message: 'Hello World'
        };

        await act(async () => {
            getByText = await render(<ChatHistory/>).getByText;
            await wait();
            mockEcho.getChannel('room').broadcast('.App\\Events\\NewMessageReceived', message);
        });
        // @ts-ignore
        expect(getByText(`${message.user}: ${message.message}`)).toBeTruthy();

    });

    xit("Shows most recent message on the bottom", async () => {
        let container;
        const messages = [
            {user: 'user1', message: 'message1'},
            {user: 'user1', message: 'message2'},
        ];
        getMessages.mockResolvedValue([messages[0]]);

        await act(async () => {
            container = await render(<ChatHistory/>).container;
            await wait();
            mockEcho.channel('room').broadcast('.App\\Events\\NewMessageReceived', messages[1]);
        });

        const lastMessageCard: HTMLElement = Array.from(container.querySelectorAll(".message-card")).pop() as HTMLElement;

        expect(lastMessageCard.nodeValue).toEqual('Foobar');
    });
});

import React from 'react';
import {render} from "@testing-library/react";
import {ChatHistory} from "./ChatHistory";
import {act} from "react-dom/test-utils";

jest.mock('../services');
const getMessages = require("../services").getMessages as jest.Mock;

describe("ChatHistory", () => {
    it("Shows existing messages on load", async () => {
        const messages = [
            {user: 'user1', message: 'message1'},
        ];

        getMessages.mockResolvedValue(messages);
        const {getByText} = render(<ChatHistory/>);

        await act(async () => {
            await new Promise((resolve) => {
                setTimeout(resolve)
            });
        });

        expect(getByText(`${messages[0].user}: ${messages[0].message}`)).toBeTruthy();
    });
});

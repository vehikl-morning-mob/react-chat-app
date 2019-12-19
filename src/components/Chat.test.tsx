import {render, fireEvent} from "@testing-library/react";
import {Chat} from "./Chat"
import React from "react";
import {postMessage} from "../services";
import {act} from "react-dom/test-utils";

jest.mock('../services', () => ({
    postMessage: jest.fn(),
    getMessages: jest.fn().mockResolvedValue([])
}));

describe('chat', () => {
    it('triggers postMessage', async () => {
        let container;
        const message: string = 'Hello Karen';
        await act(async () => {
            container = await render(<Chat/>).container;
        });
        fireEvent.input(container.querySelector("input[type='text']") as HTMLInputElement, {target: {value: message}});
        fireEvent.click(container.querySelector("button[type='submit']") as HTMLButtonElement);
        expect(postMessage).toHaveBeenCalledWith(message);
    });
})

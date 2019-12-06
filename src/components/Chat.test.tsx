import {render, fireEvent} from "@testing-library/react";
import {Chat} from "./Chat"
import React from "react";
import {postMessage} from "../services";

jest.mock('../services', () => ({
    postMessage: jest.fn()
}));

describe('chat', () => {
    it('triggers postMessage', () => {
        const {container} = render(<Chat/>);
        const message: string = 'Hello Karen';

        fireEvent.input(container.querySelector("input[type='text']") as HTMLInputElement, {target: {value: message}});
        fireEvent.click(container.querySelector("button[type='submit']") as HTMLButtonElement);

        expect(postMessage).toHaveBeenCalledWith(message);
    });
})

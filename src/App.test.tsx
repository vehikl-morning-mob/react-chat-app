import React from 'react';
import {act, render} from '@testing-library/react';
import App from './App';

describe('ChatApp', () => {
    it('renders login component when no token set', () => {
        const {container} = render(<App/>);

        expect(container.querySelector('.login-component')).toBeTruthy();
    });

    it('renders the chat component when token is set', () => {
        const {container} = render(<App/>);
        act(() => {
            window.dispatchEvent(new Event('logged-in'))
        });
        expect(container.querySelector('.login-component')).toBeFalsy();
        expect(container.querySelector('.chat-component')).toBeTruthy();
    });
});

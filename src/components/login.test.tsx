import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {Login} from './login';
import {login} from '../services';

jest.mock('../services', () => ({
    login: jest.fn()
}));

describe('Login', () => {
    it('Allows a user to login', async () => {
        const {container} = render(<Login/>);
        const userCredentials = {
            email: 'mrv__@users.men',
            password: 'taco'
        };

        fireEvent.input(container.querySelector('input[type="password"]') as HTMLElement, {target: {value: userCredentials.password}});
        fireEvent.input(container.querySelector('input[type="email"]') as HTMLElement, {target: {value: userCredentials.email}});
        fireEvent.click(container.querySelector('button[type="submit"]') as HTMLElement);

        expect(login).toHaveBeenCalledWith(userCredentials.email, userCredentials.password);
    });
});

import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {Login} from './Login';
import {login} from '../services/login';

jest.mock('../services/login', () => ({
    login: jest.fn()
}));

describe('Login', () => {
    it('Allows a user to login', async () => {
        const {container, getByTestId} = render(<Login/>);
        const userCredentials = {
            email: 'mrv__@users.men',
            password: 'taco'
        };

        fireEvent.input(container.querySelector('input[type="password"]'), {target: {value: userCredentials.password}});
        fireEvent.input(container.querySelector('input[type="email"]'), {target: {value: userCredentials.email}});
        fireEvent.click(container.querySelector('button[type="submit"]'));

        expect(login).toHaveBeenCalledWith(userCredentials.email, userCredentials.password);
    });
});

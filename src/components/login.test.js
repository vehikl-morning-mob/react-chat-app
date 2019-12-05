import React from 'react';
import {render, fireEvent} from '@testing-library/react';

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

        const byContainerPassword = container.querySelector('input[type="password"]');
        const byContainerEmail = container.querySelector('input[type="email"]');
        const byTestIdPassword = getByTestId('password-field');
        const byTestIdEmail = getByTestId('email-field');
        fireEvent.change(byTestIdPassword, {target: {value: userCredentials.password}});
        fireEvent.change(byTestIdEmail, {target: {value: userCredentials.email}});
        fireEvent.click(container.querySelector('button[type="submit"]'));

        expect(login).toHaveBeenCalledWith(userCredentials.email, userCredentials.password);
    });
});

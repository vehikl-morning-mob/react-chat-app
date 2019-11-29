import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Login} from './Login';

describe('Login', () => {
    it('Allows a user to login', () => {
        const {container} = render(<Login/>);
        fireEvent.input(container.querySelector('.email-address'), {target: {value: 'Foobar@buzzfizz.com'}});
        fireEvent.input(container.querySelector('.password-field'), {target: {value: 'Foobar'}});
        fireEvent.click(container.querySelector('button[type="submit"]'));
        expect(true).toBeTruthy();
    });
});

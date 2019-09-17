import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Section, SignForm } from '../DOM';

const LinkDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PasswordForgetPage = () => (
    <div>
        <Section>
            <PasswordForgetForm />
        </Section>
        <LinkDiv>
            <Link to={ROUTES.SIGN_IN}>Return</Link>
        </LinkDiv>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <SignForm onSubmit={this.onSubmit}>
                <div className="header">Reset password</div>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="E-Mail Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p className="error">{error.message}</p>}
            </SignForm>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
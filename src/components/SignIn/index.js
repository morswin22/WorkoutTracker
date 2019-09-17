import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styled from 'styled-components';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Section, SignForm, SignProvider } from '../DOM';
import GoogleImg from '../../assets/google.png';
import FacebookImg from '../../assets/facebook.png';

const ProvidersDiv = styled.div`
    display: flex;
    width: 250px;
    margin: 0 auto;
    justify-content: space-around;
`;

const LinksDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
`;

const SignInPage = () => (
    <div>
        <Section>
            <SignInForm />
        </Section>
        
        <ProvidersDiv>
            <SignInGoogle />
            <SignInFacebook />
        </ProvidersDiv>
        
        <LinksDiv>
            <PasswordForgetLink />
            <SignUpLink />
        </LinksDiv>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 
    'auth/account-exists-width-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <SignForm onSubmit={this.onSubmit}>
                <div className="header">Sign In</div>

                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="E-Mail"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    CONFIRM
                </button>

                {error && <p className="error">{error.message}</p>}
            </SignForm>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: []
                    })
                    .then(()=> {
                        this.setState({ error: null });
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({ error });
                    });
            }) 
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                
                this.setState({ error });
            });

        event.preventDefault();
    }

    render() {
        const {error} = this.state;

        return (
            <SignProvider onSubmit={this.onSubmit} src={GoogleImg}>
                <button type="submit"></button>
                <div>Google</div>

                {error && <p>{error.message}</p>}
            </SignProvider>
        )
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = { error: null };
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                this.props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.additionalUserInfo.profile.name,
                        email: socialAuthUser.additionalUserInfo.profile.email,
                        roles: []
                    })
                    .then(()=> {
                        this.setState({ error: null });
                        this.props.history.push(ROUTES.HOME);
                    })
                    .catch(error => {
                        this.setState({ error });
                    });
            }) 
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                
                this.setState({ error });
            });

        event.preventDefault();
    }

    render() {
        const {error} = this.state;

        return (
            <SignProvider onSubmit={this.onSubmit} src={FacebookImg}>
                <button type="submit"></button>
                <div>Facebook</div>

                {error && <p>{error.message}</p>}
            </SignProvider>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase
)(SignInFacebookBase);

const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
)

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInLink };
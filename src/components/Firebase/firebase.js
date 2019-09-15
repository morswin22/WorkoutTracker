import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        // app.analytics();

        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // Auth API

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email,password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email,password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
        });

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doSignInWithGoogle = () => 
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () => 
        this.auth.signInWithPopup(this.facebookProvider);

    // User API

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // Merge Auth and DB User API

    onAuthUserListener = (next, fallback) => {
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }

                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        })
    }

    // Expand DB https://github.com/the-road-to-react-with-firebase/react-firebase-authentication/commit/00ae1c242fc8b9f72edf91b2a96a90ca18046442
}

export default Firebase;
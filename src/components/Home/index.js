import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from  'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes';

const HomePage = () => (
    <div>
        <h1>HomePage</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Link to={ROUTES.CONFIGURE}>Configure Excercises</Link>
    </div>
);

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(HomePage);
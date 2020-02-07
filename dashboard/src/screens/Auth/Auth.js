import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Views //
import Invite from './views/Invite';
import Login from './views/Login';
import SignUp from './views/SignUp';

// Components //
import StreamLogo from 'shared/StreamLogo';
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

const Credit = styled.div`
    padding: 40px 0px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const redirectToLogin = () => <Redirect replace to="/auth/login" />;

const Auth = ({ match }) => {
    return (
        <Root>
            <Switch>
                <Route path={`${match.url}/invite`} component={Invite} />
                <Route path={`${match.url}/sign-up`} component={SignUp} />
                <Route path={`${match.url}/login`} component={Login} />
                <Route path={match.url} children={redirectToLogin} />
            </Switch>
            <Credit>
                <StreamLogo size={40} />
                <Text size={14} faded>
                    Powered by Stream.
                </Text>
            </Credit>
        </Root>
    );
};

export default Auth;

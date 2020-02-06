import React from 'react';
import moment from 'moment';

// Router //
import { Route, Router, Switch } from 'react-router-dom';
import history from 'utils/history';

// Styles //
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

// Context //
import AuthProvider from 'contexts/Auth/AuthProvider';

// Screens //
import Onboarding from 'screens/Onboarding';
import Dashboard from 'screens/Dashboard';

// Components //
import AuthedRoute from 'components/AuthedRoute';
import UnauthedRoute from 'components/UnauthedRoute';

moment.updateLocale('en', {
    calendar: {
        lastDay: '[Yesterday at] h:mma',
        sameDay: 'h:mma',
        nextDay: '[Tomorrow at] h:mma',
        lastWeek: 'MMMM Do YYYY',
        nextWeek: 'MMMM Do YYYY',
        sameElse: 'L',
    },
});

function App() {
    return (
        <ThemeProvider {...{ theme }}>
            <AuthProvider>
                <>
                    <Router {...{ history }}>
                        <Switch>
                            <UnauthedRoute
                                path="/auth"
                                component={Onboarding}
                            />
                            <AuthedRoute path="/" component={Dashboard} />
                        </Switch>
                    </Router>
                    <GlobalStyles />
                </>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;

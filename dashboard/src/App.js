import React from 'react';
import moment from 'moment';

// Router //
import { Route, Router, Switch } from 'react-router-dom';
import history from 'utils/history';

// Styles //
import ThemeProvider from 'contexts/Theme/ThemeProvider';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

// Context //
import AuthProvider from 'contexts/Auth/AuthProvider';

// Screens //
import Auth from 'screens/Auth';
import Dashboard from 'screens/Dashboard';
import Welcome from 'screens/Welcome';

// Components //
import AuthedRoute from 'components/AuthedRoute';
import OrgProtectedRoute from 'components/OrgProtectedRoute';
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
        <ThemeProvider>
            <AuthProvider>
                <>
                    <Router {...{ history }}>
                        <Switch>
                            <OrgProtectedRoute
                                path="/welcome"
                                component={Welcome}
                            />
                            <UnauthedRoute path="/auth" component={Auth} />
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

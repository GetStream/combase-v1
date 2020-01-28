import React from 'react';
import moment from 'moment';

// Router //
import { Route, Router, Switch } from 'react-router-dom';
import history from 'utils/history';

// Styles //
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyles from 'styles/global';

// Screens //
import Dashboard from 'screens/Dashboard';

moment.updateLocale('en', {
    calendar: {
        lastDay: '[Yesterday at] hh:mma',
        sameDay: 'hh:mma',
        nextDay: '[Tomorrow at] hh:mma',
        lastWeek: 'MMMM Do YYYY',
        nextWeek: 'MMMM Do YYYY',
        sameElse: 'L',
    },
});

function App() {
    return (
        <ThemeProvider {...{ theme }}>
            <>
                <Router {...{ history }}>
                    <Switch>
                        <Route path="/" component={Dashboard} />
                    </Switch>
                </Router>
                <GlobalStyles />
            </>
        </ThemeProvider>
    );
}

export default App;

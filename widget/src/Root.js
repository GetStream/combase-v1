import React from 'react';
import compose from 'lodash.flowright';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// HOCs //
import withAuth from 'hocs/withAuth';
import withChannels from '@comba.se/chat/hocs/withChannels';

// Screens //
import Home from 'screens/Home';
import Thread from 'screens/Thread';

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path="/inbox/:channel" component={Thread} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    )
}

export default compose(withAuth, withChannels)(Root);
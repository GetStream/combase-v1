import React from 'react';
import { Route } from 'react-router-dom';

// Views //
import Threads from './views/Threads';
import MessageThread from './views/MessageThread';

// Components ///
import ListDetailView from 'components/ListDetailView';
import ScreenRoot from 'shared/ScreenRoot';

const renderThreadList = props => <Threads />;
const renderMessageThread = props => (
    <MessageThread
        channelId={props.match ? props.match.params.channel : null}
        {...props}
    />
);

const Inbox = props => {
    return (
        <ListDetailView {...props} rootAs={ScreenRoot}>
            <Route
                path={`${props.match.url}/:channel`}
                children={renderMessageThread}
            />
            <Route path={props.match.url} children={renderThreadList} />
        </ListDetailView>
    );
}

export default Inbox;
import React from 'react';
import { Route } from 'react-router-dom';
import compose from 'lodash.flowright';

// Views //
import Threads from './views/Threads';
import MessageThread from './views/MessageThread';

// HOCs //
import withAuth from 'hocs/withAuth';
import withChannels from '@comba.se/chat/hocs/withChannels';

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

const Inbox = props => (
    <ListDetailView {...props} rootAs={ScreenRoot}>
        <Route
            path={`${props.match.url}/:channel`}
            children={renderMessageThread}
        />
        <Route path={props.match.url} children={renderThreadList} />
    </ListDetailView>
);

export default compose(withAuth, withChannels)(Inbox);
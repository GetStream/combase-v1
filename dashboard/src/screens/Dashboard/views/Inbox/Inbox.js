import React from 'react';
import { Route } from 'react-router-dom';

// Views //
import ThreadList from './views/ThreadList';
import MessageThread from './views/MessageThread';

// HOCs //
import withChannels from 'shared/Chat/hocs/withChannels';

// Components ///
import ListDetailView from 'components/ListDetailView';
import ScreenRoot from 'shared/ScreenRoot';

const renderThreadList = props => <ThreadList {...props} />;
const renderMessageThread = props => (
    <MessageThread
        channelId={props.match ? props.match.params.channel : null}
        {...props}
    />
);

export default withChannels(props => (
    <ListDetailView {...props} rootAs={ScreenRoot}>
        <Route
            path={`${props.match.url}/:channel`}
            children={renderMessageThread}
        />
        <Route path={props.match.url} children={renderThreadList} />
    </ListDetailView>
));

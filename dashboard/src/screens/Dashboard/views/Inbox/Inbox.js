import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { ThreadList } from '@comba.se/chat';

// Views //
import Threads from './views/Threads';
import MessageThread from './views/MessageThread';

// HOCs //
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

export default withChannels(props => (
    <ListDetailView {...props} rootAs={ScreenRoot}>
        <Route
            path={`${props.match.url}/:channel`}
            children={renderMessageThread}
        />
        <Route path={props.match.url} children={renderThreadList} />
    </ListDetailView>
));

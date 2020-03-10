import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { ThreadList } from '@comba.se/chat';

// Views //
import MessageThread from './views/MessageThread';

// HOCs //
import withChannels from 'shared/Chat/hocs/withChannels';

// Components ///
import ListDetailView from 'components/ListDetailView';
import ScreenRoot from 'shared/ScreenRoot';

const ListRoot = styled.div`
    flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 375px;
    position: fixed;
    top: 0;
    left: 96px;
    right: 0;
    bottom: 0;
  }
`;

const renderThreadList = props => <ListRoot><ThreadList {...props} /></ListRoot>;
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

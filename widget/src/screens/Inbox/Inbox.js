import React from 'react';
import styled from 'styled-components';

// HOCs //
import withChannels from '@comba.se/chat/hocs/withChannels';

// Views //
import MessageThread from './views/MessageThread';

// Components //
const Root = styled.div`
    flex: 1;
`

const Inbox = ({ match, ...props }) => {
    return (
        <Root>
            <MessageThread {...{match}} {...props} channelId={match.params.channel} />
        </Root>
    );
};

export default withChannels(Inbox);
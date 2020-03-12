import React from 'react';
import styled from 'styled-components';
import compose from 'lodash.flowright';

// HOCs //
import withAuth from 'hocs/withAuth';
import withChannels from '@comba.se/chat/hocs/withChannels';

// Views //
import MessageThread from './views/MessageThread';

// Components //
const Root = styled.div`
    flex: 1;
`

const Thread = ({ match, ...props }) => {
    return (
        <Root>
            <MessageThread {...{match}} {...props} channelId={match.params.channel} />
        </Root>
    );
};

export default compose(withAuth, withChannels)(Thread);
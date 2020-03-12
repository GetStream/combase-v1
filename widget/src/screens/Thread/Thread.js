import React from 'react';
import styled from 'styled-components';

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

export default Thread;
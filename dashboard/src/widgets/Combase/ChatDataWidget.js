import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { ListItem } from '@comba.se/ui';

// Components //
const Root = styled.div`

`

const ChatDataWidget = ({ createdAt, partnerId }) => {
    return (
        <Root>
            <ListItem title="Chat Created" value={moment(createdAt).format('MMMM Do YYYY')} />
            <ListItem title="User ID" value={partnerId} />
        </Root>
    )
};

ChatDataWidget.propTypes = {
    createdAt: PropTypes.string,
    partnerId: PropTypes.string,
}

export default ChatDataWidget;
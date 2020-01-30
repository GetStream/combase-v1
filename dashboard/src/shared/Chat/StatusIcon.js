import React from 'react';
import PropTypes from 'prop-types';

// Components //
import Avatar from 'shared/Avatar';
import { MessageDeliveredIcon, MessageSendingIcon, MessageSentIcon } from 'shared/Icons';

const StatusIcon = ({ status, partner }) => {
    switch (status) {
        case 'sending':
            return <MessageSendingIcon size={16} color="border" />
        case 'sent':
            return <MessageSentIcon size={16} color="primary" />
        case 'delivered':
            return <MessageDeliveredIcon size={16} color="primary" />
        case 'read':
            return <Avatar showStatus={false} src={partner.avatar} name={partner.name} size={16} />
        default:
            return null;
    }
};

StatusIcon.propTypes = {
    status: PropTypes.oneOf([
        'sending',
        'sent',
        'delivered',
        'read',
    ]).isRequired,
    partner: PropTypes.object.isRequired,
};

StatusIcon.defaultProps = {
    status: 'sending',
};

export default StatusIcon;
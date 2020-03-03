import React from "react";
import PropTypes from "prop-types";
import { Avatar } from '@comba.se/ui';
import {
  MessageDeliveredIcon,
  MessageSendingIcon,
  MessageSentIcon
} from "@comba.se/ui/dist/Icons";

const StatusIcon = ({ status, partner, ...rest }) => {
  switch (status) {
    case "sending":
      return <MessageSendingIcon size={16} color="border" {...rest} />;
    case "sent":
      return <MessageSentIcon size={16} color="primary" {...rest} />;
    case "delivered":
      return <MessageDeliveredIcon size={16} color="primary" {...rest} />;
    case "read":
      return (
        <Avatar
          showStatus={false}
          src={partner.avatar}
          name={partner.name}
          size={16}
          {...rest}
        />
      );
    default:
      return null;
  }
};

StatusIcon.propTypes = {
  status: PropTypes.oneOf(["sending", "sent", "delivered", "read"]).isRequired,
  partner: PropTypes.object.isRequired
};

StatusIcon.defaultProps = {
  status: "sending"
};

export default StatusIcon;

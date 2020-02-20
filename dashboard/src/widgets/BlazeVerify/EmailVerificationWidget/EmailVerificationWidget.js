import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

// Hooks //
import usePluginEndpoint from "hooks/usePluginEndpoint";

// Components //
import Card from 'shared/Card';
import CircularProgress from "shared/CircularProgress";
import Text from 'shared/Text';

const Root = styled(Card)`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:nth-child(2) {
    margin-top: 16px;
  }
`;

const EmailVerificationWidget = props => {
  const [data, { loading }] = usePluginEndpoint(
    "blaze_verify",
    "verify",
    props
  );
  if (loading) {
    return null;
  }
  return (
    <Root>
      <Text>Email Verification Score</Text>
      <CircularProgress value={67} />
    </Root>
  );
};

EmailVerificationWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailVerificationWidget;

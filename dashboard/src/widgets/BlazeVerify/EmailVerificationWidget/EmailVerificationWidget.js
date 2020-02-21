import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

// Hooks //
import usePluginEndpoint from "hooks/usePluginEndpoint";

// Components //
import { CancelIcon, MessageDeliveredIcon } from 'shared/Icons';
import Card from 'shared/Card';
import CircularProgress from "shared/CircularProgress";
import ListItem from 'shared/ListItem';
import Text from 'shared/Text';
import IconLabel from 'shared/IconLabel';

const Header = styled.div`
  padding: 16px;
  flex: 1;
  align-items: center;
  justify-content: center;

  & > ${Text} {
    margin-top: 8px;
  }
`;

const Content = styled.div`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
`;

const Credit = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  background-color: ${({ theme }) => theme.color.black};
  padding: 8px;
  justify-content: center;
  align-items: center;

  & > ${Text} {
    display: flex;
    align-items: center;

    & img {
      margin: 0px 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }
`;

const EmailVerificationWidget = props => {
  const [data, { loading }] = usePluginEndpoint(
    "blaze_verify",
    "verify",
    props
  );
  const counterColor = useMemo(() => {
    if (data && data.score) {
      if (data.score > 75) {
        return 'green';
      }
      if (data.score > 40) {
        return 'yellow';
      }
    }
    return 'red'
  }, [data]);
  if (loading) {
    return null;
  }
  return (
    <Card flat border>
      <Header>
        <CircularProgress animated color={counterColor} value={data.score || 0} size={104} />
        <Text color="alt_text">Validation Score</Text>
      </Header>
      <Content>
        <IconLabel icon={data.state === 'deliverable' ? MessageDeliveredIcon : CancelIcon} iconColor={data.state === 'deliverable' ? "green" : "red"} label="Deliverable" />
        <IconLabel icon={data.disposable ? MessageDeliveredIcon : CancelIcon} iconColor={data.disposable ? "green" : "red"} label="Disposable" />
      </Content>
      <Credit>
        <Text color="white" size={12}>
          Powered by <img alt="Blaze Verify" src="https://logo.clearbit.com/blazeverify.com" /> Blaze Verify
        </Text>
      </Credit>
    </Card>
  );
};

EmailVerificationWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailVerificationWidget;

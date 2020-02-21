import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

// Hooks //
import usePluginEndpoint from "hooks/usePluginEndpoint";

// Components //
import Card from 'shared/Card';
import CircularProgress from "shared/CircularProgress";
import ListItem from 'shared/ListItem';
import Text from 'shared/Text';

const Root = styled(Card)`
  &:nth-child(2) {
    margin-top: 16px;
  }
`;

const Header = styled.div`
  padding: 16px;
  flex: 1;
  align-items: center;
  justify-content: center;

  & > ${Text} {
    margin-top: 8px;
  }
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
  console.log(data);
  return (
    <Root>
      <Header>
        <CircularProgress animated color={counterColor} value={data.score || 0} size={104} />
        <Text color="alt_text">Validation Score</Text>
      </Header>
      <ListItem
        title="State"
        value={data.state}
      />
      <ListItem
        title="Disposable"
        value={`${data.disposable}`}
      />
      <Credit>
        <Text color="white" size={12}>
          Powered by <img alt="Blaze Verify" src="https://logo.clearbit.com/blazeverify.com" /> Blaze Verify
        </Text>
      </Credit>
    </Root>
  );
};

EmailVerificationWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailVerificationWidget;

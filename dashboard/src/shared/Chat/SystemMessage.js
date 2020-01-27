import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

// Components //
import Text from 'shared/Text';

const Root = styled(View)`
  margin: 20px 0px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Bubble = styled(View)`
  padding: 8px 12px;
  border-radius: 9999px;
  background-color: ${({color, theme}) =>
    theme.colorUtils.fade(theme.color[color], 0.16)};
`;

const Day = ({currentMessage: {text, error}}) => {
  return (
    <Root>
      <Bubble color={error ? 'error' : 'primary'}>
        <Text size={12} weight="600" color={error ? 'error' : 'primary'}>
          {text}
        </Text>
      </Bubble>
    </Root>
  );
};

export default Day;

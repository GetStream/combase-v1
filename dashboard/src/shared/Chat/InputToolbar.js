import React from "react";
import styled from "styled-components";
import { Container } from "@comba.se/ui";

// HOCs //
import withLayout from "hocs/withLayout";

// Components //
import Actions from "./Actions";
import Composer from "./Composer";
import SendButton from "./SendButton";

const Root = styled(Container)`
  flex-direction: row;
  align-items: center;
  min-height: 80px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-right: 88px;
  }
`;

const InputToolbar = ({
  onAttachment,
  onSend,
  onTextChanged,
  placeholder,
  setRef,
  text,
  textInputProps,
}) => {
  return (
    <Root ref={setRef} maxWidth={840}>
      <Actions {...{ onAttachment }} />
      <Composer
        {...{ onSend, onTextChanged, placeholder, text, textInputProps }}
      />
      <SendButton {...{ onSend, text }} />
    </Root>
  );
};

export default withLayout(InputToolbar);

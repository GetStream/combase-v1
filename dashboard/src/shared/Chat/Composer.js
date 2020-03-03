import React, { useCallback } from "react";
import styled from "styled-components";
import { AutosizeTextArea } from '@comba.se/ui';

// Components //
const Root = styled.div`
  flex: 1;
`;

const Input = styled(AutosizeTextArea)`
  width: 100%;
  resize: none;
  margin-right: 16px;
  font-size: 16px;
  line-height: 20px;
  outline: none;
  color: ${({ theme }) => theme.color.alt_text};
  font-weight: 500;
  max-height: 144px;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colorUtils.fade(theme.color.alt_text, 0.56)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-right: 0;
    max-height: 288px;
  }
`;

const Composer = ({
  onTextChanged,
  onSend,
  placeholder,
  textInputProps,
  text
}) => {
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 13 && !e.shiftKey) {
        if (!text) {
          return e.preventDefault();
        }
        onSend({ text: text.trim() }, true);
      }
      return false;
    },
    [text, onSend]
  );

  const handleChange = useCallback(
    ({ target: { value } }) => {
      onTextChanged(value);
    },
    [onTextChanged]
  );

  return (
    <Root>
      <Input
        rows={1}
        onChange={handleChange}
        {...{
          placeholder,
          onKeyDown
        }}
        value={text}
        {...textInputProps}
      />
    </Root>
  );
};

export default Composer;

import React, { memo } from "react";
import styled from "styled-components";
import { Text } from '@comba.se/ui';

// HOCs //
import asMessage from "../hocs/asMessage";

// Components //
import MessageAttachment from './MessageAttachment';
import StatusIcon from "../StatusIcon";

const Root = styled.div`
  flex-direction: row;
  z-index: 0;
  width: 100%;
  justify-content: flex-end;
`;

const StatusCol = styled.div`
  flex: 0 0 16px;
  margin-left: 8px;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const Bubble = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
  border-top-right-radius: ${({ hasPrev, theme }) =>
    hasPrev ? theme.borderRadius : theme.borderRadius * 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
  border-bottom-right-radius: ${({ hasNext, theme }) =>
    hasNext ? theme.borderRadius : theme.borderRadius * 2}px;
  max-width: 640px;
  margin-left: 24px;
  margin-top: ${({ hasAttachment }) => hasAttachment ? 4 : 0}px;

  & > ${Text} {
    word-break: ${({ breakWord }) => (breakWord ? "break-word" : null)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 160px;
  }
`;

const UserMessage = memo(
  ({
    currentMessage: { attachments, text },
    hasNext,
    hasPrev,
    isRead,
    partner,
    showStatus
  }) => {
    const breakWord = !text.includes(" ") && text.length > 48;
    return (
      <Root>
        <div>
          {attachments.length ? <MessageAttachment {...{ hasNext, hasPrev }} {...attachments[0]} /> : null}
          <Bubble hasAttachment={!!attachments.length} {...{ hasNext, hasPrev, breakWord }}>
            <Text line={24} color="alt_text">
              {text}
            </Text>
          </Bubble>
        </div>
        <StatusCol>
          {!hasNext ? (
            <StatusIcon
              {...{ partner }}
              status={isRead ? "read" : "delivered"}
            />
          ) : null}
        </StatusCol>
      </Root>
    );
  }
);

export default asMessage(UserMessage);

import React, { useMemo } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import { Card } from '@comba.se/ui';
import { InboxIcon } from "@comba.se/ui/dist/Icons";

// Components //
import ListHeader from "shared/ListHeader";

const Root = styled(animated.div)`
  position: fixed;
  right: 32px;
  bottom: 104px;
  width: 376px;
  min-height: 256px;
  max-height: 704px;
  height: calc(100% - 200px);
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.color.surface};
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
`;

const Content = styled.div`
  padding-top: 160px;
  padding-left: 16px;
  padding-right: 16px;
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 240px;
  background-color: ${({ theme }) => theme.color.primary};
`;

const Widget = ({ open }) => {
  const anim = useSpring({ value: open ? 1 : 0 });
  const style = useMemo(
    () => ({
      opacity: anim.value,
      transform: anim.value
        .interpolate({
          range: [0, 1],
          output: [8, 0]
        })
        .interpolate(v => `translateX(${v}px)`)
    }),
    [anim]
  );
  return (
    <Root {...{ style }}>
      <HeaderBackground />
      <Content>
        <Card>
          <ListHeader
            icon={InboxIcon}
            showSearch={false}
            title="Conversations"
          />
        </Card>
      </Content>
    </Root>
  );
};

export default Widget;

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import { Container, Text } from '@comba.se/ui';
import { ArrowBackIcon } from "@comba.se/ui/dist/Icons";

// Forms //
import InvitationForm from "screens/Auth/forms/InvitationForm";

// Components //
import Modal from 'shared/Modal';
import IconButton from "shared/IconButton";

const Root = styled(Animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.surface};
  z-index: ${({ theme }) => theme.z.modal};
  will-change: transform;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 1;

  & > ${Container} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
`;

const Title = styled.div`
  flex-direction: row;
  align-items: center;
  & > ${Text} {
    margin-left: 16px;
  }
`;

const FormWrapper = styled(Container)`
  flex: 1;
  justify-content: center;
  padding-top: 64px;
  padding-bottom: 40px;
`;

const FormHeader = styled.div`
  padding: 32px 0px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InviteAgents = ({ anim, history, match }) => {
  const style = useMemo(
    () => ({
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["100%", "0%"]
          })
        },
        {
          translateZ: 1
        }
      ]
    }),
    [anim]
  );
  return (
    <Modal
      animated
      animatedValue={anim}
      open={!!match}
      onClose={history.goBack}
    >
      <Root {...{ style }}>
        <Header>
          <Container>
            <Title>
              <IconButton icon={ArrowBackIcon} onClick={history.goBack} />
              <Text size={20} weight="500">
                Invite your team
              </Text>
            </Title>
          </Container>
        </Header>
        <FormWrapper maxWidth={800}>
          <FormHeader>
            <Text size={40} weight="700">
              Add Agents
            </Text>
          </FormHeader>
          <InvitationForm />
        </FormWrapper>
      </Root>
    </Modal>
  );
};

InviteAgents.propTypes = {
  anim: PropTypes.instanceOf(Animated.Value)
};

InviteAgents.defaultProps = {
  anim: new Animated.Value(0)
};

export default InviteAgents;

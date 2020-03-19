import React, { useCallback, useMemo, useState } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import { Button, Input } from '@comba.se/ui';
import { PasswordIcon, RoleIcon } from "@comba.se/ui/Icons";

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from "hooks/useAuth";
import useAgent from "hooks/useAgent";
import { useSnackbar } from 'contexts/Snackbar';

// Components //
import Modal from "shared/Modal";
import UserBlock from "shared/UserBlock";
import SectionTitle from "shared/SectionTitle";
import AgentSettingsItem from "components/SettingsListItem";
import AgentDetailTransition from "./AgentDetailTransition";
import TotalThreadsWidget from "./widgets/TotalThreadsWidget";
import ChatActivityWidget from "./widgets/ChatActivityWidget";

const Root = styled.div`
    margin-left: 96px;
    align-self: center;
    width: 100%;
    max-width: 1200px;
    min-height: 400px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16)}
    z-index: ${({ theme }) => theme.z.modal};
`;

const Header = styled.div`
  padding: 64px 88px;
  flex-direction: row;
  align-items: center;
`;

const Widgets = styled.div`
  flex-direction: row;
  flex: 1;
  margin-left: 56px;
  & > * + * {
    margin-left: 32px;
  }
`;

const Content = styled.div`
  padding: 24px 88px;
`;

const List = styled.div`
  margin-top: 24px;
`;

const Footer = styled.div`
  justify-content: center;
  align-items: center;
  padding: 56px 0px;
`;

const AgentDetail = ({ anim, location, history, match }) => {
  const [dims, setDims] = useState(null);
  const [mounted, setMount] = useState(false);
  const [{ user }, { refetchUser }] = useAuth();
  const { queueSnackbar } = useSnackbar();
  const [agent, { refetchAgents }] = useAgent(match ? match.params.agentId : null);
  const [userRole, changeRole] = useState(agent ? agent.role : '');

  const rootRef = useCallback(el => {
    if (el) {
      setDims(findDOMNode(el).getBoundingClientRect());
    }
  }, []);

  const handleChangeRole = useCallback(async ({ target: { value } }) => {
    try {
      changeRole(value);
      await request(`v1/agents/${agent._id}`, 'put', {
        body: JSON.stringify({ role: value })
      }, user.tokens.api);
      await refetchAgents();
      queueSnackbar({
        isError: false,
        replace: true,
        text: `${agent.name.first}'s role was updated! 👨‍💻`
      });
    } catch (error) {
      queueSnackbar({
        isError: true,
        replace: true,
        text: "Something went wrong!"
      });
    }
  }, [agent._id]);

  const style = useMemo(
    () => ({
      visibility: mounted ? "visible" : "hidden"
    }),
    [mounted]
  );

  const handleOpen = useCallback(() => {
    setMount(true);
  }, []);

  const handleClose = useCallback(() => {
    setMount(false);
    history.goBack();
  }, [history]);

  if (!agent) {
    return null;
  }

  return (
    <>
      <Modal
        // animated
        // animatedValue={anim}
        open={!!match}
        showUndersheet={false}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        <Root ref={rootRef} {...{ style }}>
          <Header>
            <UserBlock
              avatar={agent.image}
              avatarSize={96}
              meta={agent.email}
              name={`${agent.name.first} ${agent.name.last}`}
              textSize={32}
            />
            <Widgets>
              <TotalThreadsWidget />
              <ChatActivityWidget />
              <ChatActivityWidget />
            </Widgets>
          </Header>
          <Content>
            <SectionTitle title="Agent Settings" />
            <List>
              <AgentSettingsItem
                icon={RoleIcon}
                title="Role"
                text={`Change ${agent.name.first}s permission level`}
              >
                <Input select label="Role" value={userRole} onChange={handleChangeRole}>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </Input>
              </AgentSettingsItem>
              <AgentSettingsItem
                color="slate"
                icon={PasswordIcon}
                title="Password"
                text="Reset Lukes Password"
              >
                <Button color="red" label="Send Password Reset Email" />
              </AgentSettingsItem>
            </List>
          </Content>
          <Footer>
            <Button color="red" flat label="Deactivate Account" />
          </Footer>
        </Root>
      </Modal>
      {/* <AgentDetailTransition
        {...{ agent, anim }}
        hide={mounted}
        startDims={location.startDims}
        endDims={dims}
      /> */}
    </>
  );
};

AgentDetail.propTypes = {
  anim: PropTypes.instanceOf(Animated.Value)
};

AgentDetail.defaultProps = {
  anim: new Animated.Value(0)
};

export default AgentDetail;

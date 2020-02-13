import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

// Hooks //
import useAgent from 'hooks/useAgent';

// Components //
import { PasswordIcon, RoleIcon } from 'shared/Icons';
import Modal from 'shared/Modal';
import UserBlock from 'shared/UserBlock';
import SectionTitle from 'shared/SectionTitle';
import Button from 'shared/Button';
import AgentSettingsItem from 'components/AgentSettingsItem';
import AgentDetailTransition from './AgentDetailTransition';
import TotalThreadsWidget from './widgets/TotalThreadsWidget';
import ChatActivityWidget from './widgets/ChatActivityWidget';

const Root = styled(Animated.div)`
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

const AgentDetail = ({ anim, history, match }) => {
    const agent = useAgent(match ? match.params.agentId : null);
    const style = {
        opacity: anim,
    };

    console.log(agent);

    return (
        <>
            <Modal
                animated
                animatedValue={anim}
                open={!!match}
                showUndersheet={false}
                onClose={history.goBack}
            >
                <Root {...{ style }}>
                    <Header>
                        <UserBlock
                            avatar="https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-7c9e3281197f-512"
                            avatarSize={96}
                            meta="luke@getstream.io"
                            metaSize={16}
                            name="Luke Smetham"
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
                                text="Change Lukes permission level"
                            >
                                Admin
                            </AgentSettingsItem>
                            <AgentSettingsItem
                                color="slate"
                                icon={PasswordIcon}
                                title="Password"
                                text="Reset Lukes Password"
                            >
                                <Button
                                    color="red"
                                    label="Send Password Reset Email"
                                />
                            </AgentSettingsItem>
                        </List>
                    </Content>
                    <Footer>
                        <Button color="red" flat label="Deactivate Account" />
                    </Footer>
                </Root>
            </Modal>
            <AgentDetailTransition {...{ anim }} />
        </>
    );
};

AgentDetail.propTypes = {
    anim: PropTypes.instanceOf(Animated.Value),
};

AgentDetail.defaultProps = {
    anim: new Animated.Value(0),
};

export default AgentDetail;

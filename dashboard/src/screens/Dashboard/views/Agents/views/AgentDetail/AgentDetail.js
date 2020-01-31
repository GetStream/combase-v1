import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

// Components //
import Modal from 'shared/Modal';
import UserBlock from 'shared/UserBlock';
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

const AgentDetail = ({ anim, history, match }) => {
    const style = {
        opacity: anim,
    };

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

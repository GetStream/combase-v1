import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

// Components //
import Modal from 'shared/Modal';
import AgentDetailTransition from './AgentDetailTransition';

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
                <Root {...{ style }}></Root>
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

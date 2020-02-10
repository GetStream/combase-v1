import React, { useMemo } from 'react';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

// Data //
import plugins from 'data/plugins';

// Components //
import Modal from 'shared/Modal';
import Text from 'shared/Text';

const Root = styled(Animated.div)`
    align-self: center;
    width: 100%;
    max-width: 504px;
    min-height: 400px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16)}
    z-index: ${({ theme }) => theme.z.modal};
`;

const PluginDetail = ({ anim, history, match }) => {
    const plugin = useMemo(() => {
        if (!match) {
            return null;
        }
        const plugin = plugins.filter(
            ({ slug }) => slug === match.params.plugin
        )[0];
        return plugin;
    }, [match]);
    const style = {
        opacity: anim,
        transform: [
            {
                scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                }),
            },
            {
                translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [32, 0],
                }),
            },
        ],
    };
    return (
        <Modal
            open={!!match}
            animatedValue={anim}
            animated
            onClose={history.goBack}
        >
            {plugin ? (
                <Root {...{ style }}>
                    <Text>{plugin.title}</Text>
                </Root>
            ) : (
                <Root />
            )}
        </Modal>
    );
};

PluginDetail.defaultProps = {
    anim: new Animated.Value(0),
};

export default PluginDetail;

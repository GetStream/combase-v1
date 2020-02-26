import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';
import Easing from 'animated/lib/Easing';

// Components //
import Portal from 'shared/Portal';
import Text from 'shared/Text';

const Root = styled.div`
    position: fixed;
    bottom: 32px;
    left: 32px;
    z-index: ${({ theme }) => theme.z.snackbar};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm - 1}px) {
        bottom: 16px;
        left: 16px;
        right: 16px;
    }
`;

const SnackbarRoot = styled(Animated.div)`
    padding: 16px;
    width: 100%;
    background-color: ${({ isError, theme }) =>
        isError ? theme.color.error : theme.color.black};
    border-radius: ${({ theme }) => theme.borderRadius / 2}px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.32);

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        max-width: 344px;
    }

    & > ${Text} {
        color: ${({ theme }) => theme.color.white};
        font-size: 14px;
        line-height: 20px;
        user-select: none;
    }
`;

class Snackbar extends PureComponent {
    static propTypes = {
        isError: PropTypes.bool,
        show: PropTypes.bool,
        text: PropTypes.string,
    };

    anim = new Animated.Value(0);

    state = {
        mount: false,
    };

    componentDidUpdate(prevProps) {
        const { show } = this.props;
        if (!prevProps.show && show) {
            this.show().then(this.props.onShow);
        } else if (prevProps.show && !show) {
            this.hide().then(this.props.onHide);
        }
    }

    show = () => {
        return new Promise((res, rej) => {
            this.setState(
                {
                    mount: true,
                },
                () => {
                    Animated.timing(this.anim, {
                        toValue: 1,
                        duration: 250,
                        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                    }).start(res);
                }
            );
        });
    };

    hide = () => {
        return new Promise((res, rej) => {
            Animated.timing(this.anim, {
                toValue: 0,
                duration: 200,
                easing: Easing.bezier(0.4, 0.0, 1, 1),
            }).start(() => {
                this.setState(
                    {
                        mount: false,
                    },
                    res
                );
            });
        });
    };

    get snackbarStyle() {
        return {
            transform: [
                {
                    translateY: this.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 0],
                    }),
                },
            ],
            opacity: this.anim,
        };
    }

    render() {
        const { isError, text } = this.props;
        const { mount } = this.state;
        return (
            <Portal unmount={!mount}>
                <Root>
                    <SnackbarRoot isError={isError} style={this.snackbarStyle}>
                        <Text>{text}</Text>
                    </SnackbarRoot>
                </Root>
            </Portal>
        );
    }
}

export default Snackbar;

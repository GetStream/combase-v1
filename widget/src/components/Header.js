import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Avatar, Container, Fill, Text } from '@comba.se/ui';
import { animated, interpolate, useSpring } from 'react-spring';

// Hooks //
import { useScrollAnim } from 'contexts/ScrollAnimation';
import { useAuth } from 'contexts/Auth';

// Components //
import ChatHeader from './ChatHeader';

const Background = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.primary};
`

const Root = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    justify-content: flex-end;
    overflow: hidden;
`

const Brand = styled(animated.div)`
    margin-top: 40px;
    margin-bottom: 24px;
    justify-content: center; 
    align-items: center;
    text-align: center;
`

const Tagline = styled(Text)`
    max-width: 288px;
`

const OrgMeta = styled.div`
    margin-top: 16px;
`

const HeaderAvatar = styled(Avatar)`
    border: 4px solid white;
`

const ShrinkHeader = styled.div`
    flex: 0 0 64px;
    background-color: ${({ theme }) => theme.color.primary};
`;

const Header = ({ shrunk, transitionAnim }) => {
    const theme = useContext(ThemeContext);
    const { value: shrinkAnim } = useSpring({ value: shrunk ? 1 : 0 })
    const { anim } = useScrollAnim();

    const rootStyle = useMemo(() => ({
        height: shrinkAnim.interpolate({
            range: [0, 1],
            output: [320, 64]
        }),
        backgroundColor: shrinkAnim.interpolate({
            range: [0, 1],
            output: [theme.color.primary, theme.color.surface]
        }),
        boxShadow: shrinkAnim.interpolate({
            range: [0, 1],
            output: [0, .08]
        }).interpolate(v => `0px 4px 8px rgba(0, 0, 0, ${v})`)
    }), []);

    const containerStyle = useMemo(() => ({
        transform: interpolate([
            anim.value.interpolate({ range: [40, 240], output: [1, 0.95], extrapolate: 'clamp' }),
            anim.value.interpolate({ range: [40, 240], output: [0, 8], extrapolate: 'clamp' }),
            shrinkAnim.interpolate({ range: [0, 1], output: [0, -100] })
        ], (scale, y, y2) => `translate3d(0, calc(${y}px + ${y2}%), 0) scale(${scale})`),
        opacity: shrinkAnim.interpolate({
            range: [0, 1],
            output: [1, 0]
        })
    }), [shrinkAnim]);

    const titleStyle = useMemo(() => ({
        opacity: anim.value.interpolate({
            range: [40, 240],
            output: [1, 0],
            extrapolateRight: 'clamp'
        }),
    }), [anim]);

    const textStyle = useMemo(() => ({
        opacity: anim.value.interpolate({
            range: [0, 64],
            output: [1, 0],
            extrapolateRight: 'clamp'
        }),
        zIndex: 3,
        transform: interpolate([
            anim.value.interpolate({ range: [0, 64], output: [0, 32], extrapolate: 'clamp' }),
            shrinkAnim.interpolate({ range: [0, 1], output: [0, 200], extrapolate: 'clamp' }),
        ], (y, y2) => `translate3d(0, -${y + y2}px, 0)`)
    }), [anim.value]);

    const chatHeaderStyle = useMemo(() => ({
        opacity: shrinkAnim
    }), []);

    return (
        <>
            <Background style={rootStyle} />
            <Root style={rootStyle}>
                <Container as={animated.div} style={containerStyle}>
                    <Brand>
                        <HeaderAvatar showStatus={false} size={72} name="Stream" />
                        <OrgMeta>
                            <Text as={animated.p} style={titleStyle} size={32} weight="700" color="text">
                                Stream
                            </Text>
                            <Tagline as={animated.p} style={titleStyle} line={20} faded color="text" size={12} weight="500">
                                Ship Feeds & Chat Faster
                            </Tagline>
                        </OrgMeta>
                    </Brand>
                    <Fill />
                    <Text as={animated.p} style={textStyle} size={24} weight="700" color="text">Hello, Luke! <span role="img" aria-label="Waving">👋</span></Text>
                </Container>
                <ChatHeader style={chatHeaderStyle} />
            </Root>
        </>
    );
};

export default Header;
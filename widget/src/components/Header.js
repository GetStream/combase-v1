import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Avatar, Container, Fill, Text } from '@comba.se/ui';
import { animated, interpolate } from 'react-spring';

// Hooks //
import { useScrollAnim } from 'contexts/ScrollAnimation';
import useAuth from 'hooks/useAuth';

// Components //
const Background = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.gray};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
`

const Root = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    padding: 32px 16px 64px 16px;
    & ${Container} {
        flex: 1;
        justify-content: flex-end;
    }
`

const Brand = styled(animated.div)`
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

const Header = ({ transitionAnim }) => {
    // const { anim } = useScrollAnim();

    // const brandStyle = useMemo(() => ({
    //     opacity: anim.value.interpolate({
    //         range: [40, 240],
    //         output: [1, 0],
    //     }),
    //     transform: interpolate([
    //         anim.value.interpolate({ range: [40, 240], output: [1, 0.95], extrapolate: 'clamp' }),
    //         anim.value.interpolate({ range: [40, 240], output: [0, 8], extrapolate: 'clamp' }),
    //     ], (scale, y) => `translate3d(0, ${y}px, 0) scale(${scale})`)
    // }), [anim.value]);

    // const textStyle = useMemo(() => ({
    //     opacity: anim.value.interpolate({
    //         range: [0, 64],
    //         output: [1, 0],
    //         extrapolateRight: 'clamp'
    //     }),
    //     transform: anim.value.interpolate({ range: [0, 64], output: [0, 32], extrapolate: 'clamp' }).interpolate((y) => `translate3d(0, -${y}px, 0)`)
    // }), [anim.value]);

    // const rootStyle = useMemo(() => ({
    //     height: transitionAnim.value.interpolate({
    //         range: [0, 1],
    //         output: [320, 64]
    //     })
    // }), []);

    return (
        <>
            <Background />
            <Root>
                <Container>
                    <Brand>
                        <HeaderAvatar showStatus={false} size={72} name="Stream" />
                        <OrgMeta>
                            <Text size={32} weight="700">
                                Stream
                            </Text>
                            <Tagline line={20} faded color="alt_text" size={12} weight="500">
                                Ship Feeds & Chat Faster
                            </Tagline>
                        </OrgMeta>
                    </Brand>
                    <Fill />
                    <Text as={animated.p} size={24} weight="700" color="primary">Hello, Luke! <span role="img" aria-label="Waving">👋</span></Text>
                </Container>
            </Root>
        </>
    );
};

export default Header;
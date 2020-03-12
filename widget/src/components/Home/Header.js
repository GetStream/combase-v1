import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Avatar, Container, Fill, Text } from '@comba.se/ui';
import { animated, interpolate } from 'react-spring';

// Hooks //
import { useScrollAnim } from 'contexts/ScrollAnimation';
import useAuth from 'hooks/useAuth';

// Components //
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 320px;
    width: 100%;
    background-color: ${({ theme }) => theme.color.primary};
`

const Root = styled.div`
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

const Header = () => {
    const [{ organization }] = useAuth();
    const { anim } = useScrollAnim();
    console.log(organization);
    const brandStyle = useMemo(() => ({
        opacity: anim.value.interpolate({
            range: [40, 240],
            output: [1, 0],
        }),
        transform: interpolate([
            anim.value.interpolate({ range: [40, 240], output: [1, 0.95], extrapolate: 'clamp' }),
            anim.value.interpolate({ range: [40, 240], output: [0, 8], extrapolate: 'clamp' }),
        ], (scale, y) => `translate3d(0, ${y}px, 0) scale(${scale})`)
    }), [anim.value]);

    const textStyle = useMemo(() => ({
        opacity: anim.value.interpolate({
            range: [0, 64],
            output: [1, 0],
            extrapolateRight: 'clamp'
        }),
        transform: anim.value.interpolate({ range: [0, 64], output: [0, 32], extrapolate: 'clamp' }).interpolate((y) => `translate3d(0, -${y}px, 0)`)
    }), [anim.value]);

    return (
        <>
            <Background />
            <Root>
                <Container>
                    <Brand style={brandStyle}>
                        <HeaderAvatar showStatus={false} size={72} name={organization.name} src={organization.meta.branding.logo} />
                        <OrgMeta>
                            <Text color="white" size={32} weight="700">
                                {organization.name}
                            </Text>
                            <Tagline line={20} faded color="white" size={12} weight="500">
                                {organization.meta.tagline}
                            </Tagline>
                        </OrgMeta>
                    </Brand>
                    <Fill />
                    <Text as={animated.p} style={textStyle} size={24} weight="700" color="white">Hello, Josh! <span role="img" aria-label="Waving">👋</span></Text>
                </Container>
            </Root>
        </>
    );
};

export default Header;
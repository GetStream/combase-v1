import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Hooks //
import useMedia from 'hooks/useMedia';

// Components //
import Container from 'shared/Container';
import Text from 'shared/Text';
import MenuButton from 'shared/MenuButton';

const Root = styled.div`
    background-color: ${({ theme }) => theme.color.primary};
    & > ${Container} {
        padding-top: 8px;
        padding-bottom: 152px;
    }
`;

const Content = styled.div`
    padding: 0px 16px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 24px;
    }
    & > * + * {
        margin-top: 8px;
    }
`;

const PageIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.surface};
    justify-content: center;
    align-items: center;
`;

const Description = styled(Text)`
    max-width: 360px;
`;

const Header = styled.div`
    height: 64px;
    flex-direction: row;
    align-items: center;
    padding: 0px 16px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 24px;
    }
`;

const FullScreenHeader = ({ icon: Icon, text, title }) => {
    const isMobile = useMedia('sm');
    return (
        <Root>
            {isMobile ? (
                <Header>
                    <MenuButton color="white" />
                </Header>
            ) : null}
            <Container>
                <Content>
                    <PageIcon>
                        {Icon ? <Icon size={24} color="primary" /> : null}
                    </PageIcon>
                    <Text color="surface" size={32} weight="600">
                        {title}
                    </Text>
                    <Description color="surface" faded>
                        {text}
                    </Description>
                </Content>
            </Container>
        </Root>
    );
};

FullScreenHeader.propTypes = {
    icon: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default FullScreenHeader;

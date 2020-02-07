import React, { useCallback } from 'react';
import styled from 'styled-components';

// Hooks //
import useAuth from 'hooks/useAuth';

// Components //
import Card from 'shared/Card';
import Text from 'shared/Text';

const Root = styled(Card)`
    padding: 4px;
    cursor: pointer;
`;

const Logo = styled.div`
    width: 100%;
    padding-top: 100%;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-image: ${({ src }) => `url(${src})`};
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const Meta = styled.div`
    padding: 8px;
`;

const OrganizationCard = ({ id, logo, name, tagline }) => {
    const [_, { setCurrentOrganization }] = useAuth();
    const onClick = useCallback(() => {
        setCurrentOrganization(id);
    }, [id, setCurrentOrganization]);
    return (
        <Root {...{ onClick }}>
            <Logo src={logo} />
            <Meta>
                <Text>{name}</Text>
                <Text size={12} faded>
                    {tagline}
                </Text>
            </Meta>
        </Root>
    );
};

export default OrganizationCard;

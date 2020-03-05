import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from "@comba.se/ui";

// Components //
const Root = styled.div`
    flex-direction: row;
    align-items: center;
    padding: 20px 24px 12px 24px;

    & ${Text} {
        margin-left: 8px;
    }
`;

const CardHeader = ({ icon: Icon, title }) => {
    return (
        <Root>
            <Icon />
            <Text weight="600">{title}</Text>
        </Root>
    );
};

CardHeader.propTypes = {
    icon: PropTypes.func,
    text: PropTypes.string,
}

export default CardHeader;
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    padding: 8px;
    justify-content: center;
    align-items: center;

    & > ${Text} {
        margin-top: 8px;
    }
`;

const IconLabel = ({ icon: Icon, iconColor, iconSize, label, labelColor, labelSize }) => {
    return (
        <Root>
            <Icon color={iconColor} size={iconSize} />
            <Text color={labelColor} size={labelSize}>{label}</Text>
        </Root>
    );
};

IconLabel.propTypes = {
    icon: PropTypes.func.isRequired,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    label: PropTypes.string.isRequired,
    labelColor: PropTypes.string,
    labelSize: PropTypes.number,
};

IconLabel.defaultProps = {
    iconColor: 'primary',
    iconSize: 32,
    labelColor: 'alt_text',
    labelSize: 12,
};

export default IconLabel;
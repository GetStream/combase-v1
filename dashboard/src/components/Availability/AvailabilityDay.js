import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ active, theme }) => active ? theme.color.primary : 'transparent'};
    border: 1px solid ${({ active, theme }) => active ? theme.color.primary : theme.color.border};
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & + & {
        margin-left: 16px;
    }
`;

const AvailabilityDay = ({ active, day, onClick }) => (
    <Root {...{ active, onClick }}>
        <Text color={active ? 'white' : "alt_text"}>{day}</Text>
    </Root>
);

AvailabilityDay.propTypes = {
    active: PropTypes.bool,
    day: PropTypes.string,
    onClick: PropTypes.func,
};

export default AvailabilityDay;
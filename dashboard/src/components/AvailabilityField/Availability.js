import React from 'react';
import styled from 'styled-components';

// Components //
import AvailabilityDay from './AvailabilityDay';

const Root = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (min-width: ${ ({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 16px;
    }
`;

const renderDays = (days, onChange) => Object.entries(days).map(([day, data], key) => (<AvailabilityDay {...{ days, day, key, onChange }} {...data} />));

const Availability = ({ value, onChange }) => {
    return (
        <Root>
            {renderDays(value, onChange)}
        </Root>
    );
};

export default Availability;
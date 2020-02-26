import React from 'react';
import styled from 'styled-components';

import dayMap from './dayMap';

// Components //
import AvailabilityDay from './AvailabilityDay';

const Root = styled.div`
    flex-direction: row;
    align-items: center;
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
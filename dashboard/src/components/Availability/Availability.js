import React from 'react';
import styled from 'styled-components';

import dayMap from './dayMap';

// Components //
import AvailabilityDay from './AvailabilityDay';

const Root = styled.div`
    flex-direction: row;
    align-items: center;
`;

const renderDays = () => dayMap.map((day, key) => (<AvailabilityDay {...{ day, key }} />));

const Availability = () => {
    return (
        <Root>
            {renderDays()}
        </Root>
    );
};

export default Availability;
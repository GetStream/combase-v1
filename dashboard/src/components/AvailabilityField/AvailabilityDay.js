import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ enabled, theme }) => enabled ? theme.color.primary : 'transparent'};
    border: 1px solid ${({ enabled, theme }) => enabled ? theme.color.primary : theme.color.border};
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & > ${Text} {
        user-select: none;
        text-transform: uppercase;
    }
`;

const AvailabilityDay = ({ enabled, day, days, onChange }) => {
    const onClick = useCallback(() => {
        onChange({
            target: {
                name: 'availability',
                value: {
                    ...days,
                    [day]: {
                        ...days[day],
                        enabled: !enabled
                    }
                }
            }
        });
    }, [days, day, enabled, onChange]);
    return (
        <Root {...{ enabled, onClick }}>
            <Text color={enabled ? 'white' : "alt_text"}>{day.charAt(0)}</Text>
        </Root>
    );
}

AvailabilityDay.propTypes = {
    enabled: PropTypes.bool,
    day: PropTypes.string,
    days: PropTypes.object,
    onChange: PropTypes.func,
};

export default AvailabilityDay;
import React from 'react'; // eslint-disable-line no-unused-vars
import { withTheme } from 'styled-components';
import { Icon } from '@comba.se/ui';

const Logo = ({ theme, ...props }) => (
    <Icon {...props} viewBox="0 0 320 320">
        <g>
            <circle
                id="Oval"
                stroke={theme.color.primary}
                strokeWidth="16"
                fill={theme.color.primary}
                cx="160"
                cy="160"
                r="150"
            ></circle>
        </g>
    </Icon>
);

export default withTheme(Logo);

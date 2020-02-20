import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

// Components //
const Root = styled.svg`
    width: ${ ({ size }) => size}px;
    height: ${ ({ size }) => size}px;
    fill: none;
    transform: rotate(180deg) scaleX(-1);

    & path {
        stroke-dasharray: ${({ value }) => value}, 100000;
    }
`;

const CircularProgress = ({ color, value, theme, ...props }) => (
    <Root color="transparent" viewBox="0 0 40 40" {...props} {...{value}}>
        <g>
            <circle stroke={theme.color.text} strokeWidth="4" opacity="0.08" cx="20" cy="20" r="16" />
            <path d="M20,36 C28.836556,36 36,28.836556 36,20 C36,11.163444 28.836556,4 20,4 C11.163444,4 4,11.163444 4,20 C4,28.836556 11.163444,36 20,36 Z" stroke={theme.color[color]} strokeWidth="4" strokeLinecap="round" />
        </g>
    </Root>
);

CircularProgress.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    value: PropTypes.number.isRequired,
};

CircularProgress.defaultProps = {
    color: "primary",
    size: 40,
}

export default withTheme(CircularProgress);
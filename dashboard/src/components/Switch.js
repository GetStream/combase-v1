import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MDSwitch from '@material/react-switch';
import '@material/react-switch/index.scss';

// Components //
const Root = styled(MDSwitch)`
    &:not(.mdc-switch--checked) {
        & .mdc-switch__thumb {
            background-color: ${({ theme }) => theme.color.surface} !important;
            border-color: ${({ theme }) => theme.color.surface} !important;
        }
        & .mdc-switch__track {
            background-color: ${({ theme }) => theme.color.text} !important;
            border-color: ${({ theme }) => theme.color.text} !important;
        }
        & .mdc-switch__thumb-underlay::after,
        & .mdc-switch__thumb-underlay::before {
            background-color: ${({ theme }) => theme.color.text} !important;
        }
    }
    &.mdc-switch--checked {
        & .mdc-switch__thumb {
            background-color: ${({ color, theme }) => theme.color[color]} !important;
            border-color: ${({ color, theme }) => theme.color[color]} !important;
        }
        & .mdc-switch__track {
            background-color: ${({ color, theme }) => theme.color[color]} !important;
            border-color: ${({ color, theme }) => theme.color[color]} !important;
        }
        & .mdc-switch__thumb-underlay::after,
        & .mdc-switch__thumb-underlay::before {
            background-color: ${({ color, theme }) => theme.color[color]} !important;
        }
    }
`;

const Switch = props => (
    <Root {...props} />
);

Switch.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

Switch.defaultProps = {
    color: 'primary',
}

export default Switch;

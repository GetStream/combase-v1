import React from 'react';
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
            background-color: ${({ theme }) => theme.color.primary} !important;
            border-color: ${({ theme }) => theme.color.primary} !important;
        }
        & .mdc-switch__track {
            background-color: ${({ theme }) => theme.color.primary} !important;
            border-color: ${({ theme }) => theme.color.primary} !important;
        }
        & .mdc-switch__thumb-underlay::after,
        & .mdc-switch__thumb-underlay::before {
            background-color: ${({ theme }) => theme.color.primary} !important;
        }
    }
`;

const Switch = ({ checked, onChange }) => (
    <Root checked={checked} onChange={onChange} />
);

export default Switch;

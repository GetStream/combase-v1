import { css } from 'styled-components';

export default css`
    color: ${({ theme }) => theme.color.alt_text};
    font-size: 14px;
    padding: 12px;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-text-fill-color: ${({ theme }) =>
        theme.color.alt_text} !important;
        -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.color.surface}
            inset !important;
    }
`;
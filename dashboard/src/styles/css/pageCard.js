import { css } from 'styled-components';

export default css`
    overflow: hidden;
    box-shadow: -4px 0px 24px rgba(0, 0, 0, 0.12);
    border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;
`;

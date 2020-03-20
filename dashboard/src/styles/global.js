import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`
  ${fonts}

  body {
    background-color: ${({ theme }) => theme.color.surface};
  }
`;

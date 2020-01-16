import { createGlobalStyle } from "styled-components";

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`

  * {
    outline: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    display: flex;
    background-color: ${({ theme }) => theme.color.background};
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  #root {
      position: relative;
      display: flex;
      align-items: stretch;
      flex: 1;
      height: 100%;
  }

  div {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: stretch;
  }
`;

import { css } from "styled-components";

import CircularStdBook from "./CircularStd/CircularStd-Book.otf";
import CircularStdMedium from "./CircularStd/CircularStd-Medium.otf";
import CircularStdBold from "./CircularStd/CircularStd-Bold.otf";
import CircularStdBlack from "./CircularStd/CircularStd-Black.otf";

export default css`
  @font-face {
    font-family: "Circular Std";
    font-weight: 400;
    src: url(${CircularStdBook});
  }
  @font-face {
    font-family: "Circular Std";
    font-weight: 500;
    src: url(${CircularStdMedium});
  }
  @font-face {
    font-family: "Circular Std";
    font-weight: 600;
    src: url(${CircularStdBold});
  }
  @font-face {
    font-family: "Circular Std";
    font-weight: 800;
    src: url(${CircularStdBlack});
  }
`;

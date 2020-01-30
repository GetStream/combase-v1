import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";

const Undersheet = styled(Animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ show, theme }) =>
    show ? theme.color.undersheet : "transparent"};
  ${""}
  z-index: ${({ theme }) => theme.z.modal};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  backdrop-filter: blur(5px);
`;

export default Undersheet;

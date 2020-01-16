import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import styled from "styled-components";

const Avatar = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

Avatar.propTypes = {
  size: PropTypes.number
};

Avatar.defaultProps = {
  size: 40
};

export default Avatar;

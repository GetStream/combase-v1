import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import styled from "styled-components";

const StatusBadge = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.green};
  border: ${({ size }) => size / 4}px solid ${({ borderColor, theme }) => theme.color[borderColor]};
`;

StatusBadge.propTypes = {
  size: PropTypes.number,
}

StatusBadge.defaultProps = {
  size: 16,
}

export default StatusBadge;

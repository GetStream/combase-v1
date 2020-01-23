import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import styled from "styled-components";

// Components //
import StatusBadge from "components/StatusBadge";

const Root = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

const Status = styled(StatusBadge)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Avatar = ({ size, statusBorder }) => (
  <div>
    <Root {...{ size }} />
    <Status borderColor={statusBorder} />
  </div>
);

Avatar.propTypes = {
  size: PropTypes.number,
  statusBorder: PropTypes.string
};

Avatar.defaultProps = {
  size: 40,
  statusBorder: "surface"
};

export default Avatar;

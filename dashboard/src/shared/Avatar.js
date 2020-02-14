import React, { cloneElement } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import styled from "styled-components";

// Components //
import StatusBadge from "shared/StatusBadge";
import Text from "shared/Text";

const Root = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.primary};
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > ${Text} {
    user-select: none;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Status = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Avatar = ({
  className,
  name,
  showStatus,
  size,
  src,
  status,
  statusComponent,
  statusBorder,
  statusProps
}) => {
  return (
    <div>
      <Root {...{ className, size }}>
        {!src ? (
          <Text color="white" size={size / 2} weight="600">
            {name.charAt(0)}
          </Text>
        ) : (
          <img alt={name} {...{ src }} />
        )}
      </Root>
      {showStatus ? (
        <Status
          as={statusComponent || StatusBadge}
          size={size / 3}
          borderColor={statusBorder}
          {...{ status }}
          {...statusProps}
        />
      ) : null}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  showStatus: PropTypes.bool,
  size: PropTypes.number,
  src: PropTypes.string,
  statusBorder: PropTypes.string
};

Avatar.defaultProps = {
  showStatus: true,
  size: 40,
  statusBorder: "surface"
};

export default Avatar;

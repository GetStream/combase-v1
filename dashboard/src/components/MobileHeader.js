import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import { ArrowBackIcon } from 'shared/Icons';
import MenuButton from "shared/MenuButton";
import IconButton from "shared/IconButton";
import Text from 'shared/Text';

const Root = styled.div`
  flex: 0 0 64px;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
  & ${Text} {
      margin-left: 16px;
  }
`;

const MobileHeader = ({ color, showBackBtn, onBackClick, title }) => {
    return (
        <Root>
            {showBackBtn ? (
                <IconButton icon={ArrowBackIcon} onClick={onBackClick} {...{ color }} />
            ) : (
                    <MenuButton {...{ color }} />
                )}
            {title ? (
                <Text size={16} {...{ color }}>
                    {title}
                </Text>
            ) : null}
        </Root>
    );
};

MobileHeader.propTypes = {
    color: PropTypes.string,
    showBackBtn: PropTypes.bool,
    onBackClick: PropTypes.func,
    title: PropTypes.string,
};

MobileHeader.defaultProps = {
    color: 'text',
    showBackBtn: false,
}

export default MobileHeader;
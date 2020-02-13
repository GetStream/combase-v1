import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Avatar from 'shared/Avatar';
import Text from 'shared/Text';

const Root = styled.div`
    flex-direction: row;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 24px;
`;

const UserBlock = ({ avatar, avatarSize, meta, metaSize, name, textSize }) => (
    <Root>
        <Avatar size={avatarSize} {...{ name }} src={avatar} />
        <Content>
            <Text color="text" weight="600" size={textSize}>
                {name}
            </Text>
            <Text color="alt_text" faded size={metaSize || textSize * 0.75}>
                {meta}
            </Text>
        </Content>
    </Root>
);

UserBlock.propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarSize: PropTypes.number.isRequired,
    meta: PropTypes.string.isRequired,
    metaSize: PropTypes.number,
    name: PropTypes.string.isRequired,
    textSize: PropTypes.number.isRequired,
};

UserBlock.defaultProps = {
    avatarSize: 48,
    textSize: 16,
};

export default UserBlock;

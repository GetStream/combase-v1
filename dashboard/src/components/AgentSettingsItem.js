import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';
import IconBubble from 'shared/IconBubble';

const Root = styled.div`
    padding: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TitleBlock = styled.div`
    flex-direction: row;
    align-items: center;
`;

const Content = styled.div`
    margin-left: 24px;
`;

const AgentSettingsItem = ({ children, color, icon, text, title }) => (
    <Root>
        <TitleBlock>
            <IconBubble {...{ color, icon }} />
            <Content>
                <Text weight="500">{title}</Text>
                <Text faded color="alt_text" size={12}>
                    {text}
                </Text>
            </Content>
        </TitleBlock>
        {children}
    </Root>
);

AgentSettingsItem.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.func,
    text: PropTypes.string,
    title: PropTypes.string,
};

export default AgentSettingsItem;

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Utils //
import history from 'utils/history';

// Components //
import Card from 'shared/Card';
import Text from 'shared/Text';
import Fill from 'shared/Fill';
import { SettingsIcon } from 'shared/Icons';
import IconButton from 'shared/IconButton';
import PluginDisplay from 'components/PluginDisplay';

const Root = styled(Card)`
    padding: 20px;
    flex: 1;
    & ${Text} {
        user-select: none;
    }
`;

const Footer = styled.div`
    margin-top: 16px;
    flex-direction: row;
    justify-content: flex-end;
`;

const PluginCard = ({ avatar, available, description, slug, title, url }) => (
    <Root border flat>
        <PluginDisplay {...{ avatar, available, description, title, url }} />
        <Fill />
        <Footer>
            <IconButton
                disabled={!available}
                onClick={() => history.push(`/plugins/${slug}`)}
                icon={SettingsIcon}
                size={16}
                color="alt_text"
            />
        </Footer>
    </Root>
);

PluginCard.propTypes = {
    avatar: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
};

export default memo(PluginCard);

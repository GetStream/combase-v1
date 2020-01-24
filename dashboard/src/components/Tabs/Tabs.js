import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Tab from './Tab';

const Root = styled.div`
    flex-direction: row;
    align-items: center;
    padding: 24px 0px;

    & > * + * {
        margin-left: 24px;
    }
`;

const renderTabs = (tabs, activeTab, onClick) =>
    tabs.map((tab, key) => (
        <Tab {...{ key, onClick }} active={activeTab === tab} label={tab} />
    ));

const Tabs = ({ active, onTabClick, tabs }) => {
    return <Root>{renderTabs(tabs, active, onTabClick)}</Root>;
};

Tabs.propTypes = {
    active: PropTypes.any,
    onTabClick: PropTypes.func,
    tabs: PropTypes.array,
};

export default Tabs;

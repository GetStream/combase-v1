import React from 'react';
import PropTypes from 'prop-types';

// Components //
import Tabs from 'components/Tabs';
import Card from 'shared/Card';
import SearchHeader from './SearchHeader';

const PageSheet = ({ activeTab, children, onQueryChange, setActiveTab, showSearch, tabs, ...rest }) => {
    return (
        <Card {...rest}>
            {showSearch ? <SearchHeader onChange={onQueryChange} /> : null}
            {tabs && tabs.length ? <Tabs {...{ tabs }} active={activeTab} onTabClick={setActiveTab} /> : null}
            {children}
        </Card>
    );
};

PageSheet.propTypes = {
    activeTab: PropTypes.string,
    onQueryChange: PropTypes.func,
    setActiveTab: PropTypes.func,
    showSearch: PropTypes.bool,
    tabs: PropTypes.array,
};

PageSheet.defaultProps = {
    showSearch: true,
};

export default PageSheet;

import React from 'react';
import PropTypes from 'prop-types';

// Components //
import Card from 'shared/Card';
import SearchHeader from './SearchHeader';

const PageSheet = ({ children, onQueryChange, showSearch, ...rest }) => {
    return (
        <Card {...rest}>
            {showSearch ? <SearchHeader onChange={onQueryChange} /> : null}
            {children}
        </Card>
    );
};

PageSheet.propTypes = {
    onQueryChange: PropTypes.func,
    showSearch: PropTypes.bool,
};

PageSheet.defaultProps = {
    showSearch: true,
};

export default PageSheet;

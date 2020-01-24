import React from 'react';
import PropTypes from 'prop-types';

// Components //
import Card from 'shared/Card';
import SearchHeader from 'components/Card/SearchHeader';

const PageSheet = ({ children, showSearch, ...rest }) => (
    <Card {...rest}>
        {showSearch ? <SearchHeader /> : null}
        {children}
    </Card>
);

PageSheet.propTypes = {
    showSearch: PropTypes.bool,
};

PageSheet.defaultProps = {
    showSearch: true,
};

export default PageSheet;

import React from 'react';
import { withTheme } from 'styled-components';
import ContentLoader from 'react-content-loader';

const PlaceholderIcon = ({ size, theme }) => {
    return (
        <ContentLoader width={size} height={size} viewBox="0 0 24 24" backgroundColor={theme.color.placeholder} foregroundColor={theme.color.placeholder_shimmer}>
            <circle cx="12" cy="12" r="12" />
        </ContentLoader>
    );
};

export default withTheme(PlaceholderIcon);
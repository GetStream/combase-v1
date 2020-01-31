import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    justify-content: flex-start;
`;

const Label = styled(Text)`
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const InfoWidget = ({ label, widget: Widget }) => {
    return (
        <Root>
            <Widget />
            <Label color="alt_text" faded size={12} weight="600">
                {label}
            </Label>
        </Root>
    );
};

InfoWidget.propTypes = {
    widget: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
};

export default InfoWidget;

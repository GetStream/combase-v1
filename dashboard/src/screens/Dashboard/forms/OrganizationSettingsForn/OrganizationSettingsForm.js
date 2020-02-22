import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Component //
const Root = styled.form`

`;

const renderForm = form => {
    return (
        <Root>
            Org Settings Form.
        </Root>
    );
};

const OrganizationSettingsForm = () => {
    return (
        <Formik children={renderForm} />
    )
}

export default OrganizationSettingsForm;
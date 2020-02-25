import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Component //
import AvatarInput from 'shared/AvatarInput';
import { Col, Grid, Row } from 'shared/Grid';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';

import validationSchema from './validationSchema';

const Root = styled.form`
    flex: 1;
    & > * + * {
        margin-top: 8px;
    }
`;

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const renderForm = ({ initialValues, values }) => {
    console.log('org data', initialValues);
    return (
        <Root>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Organization Profile" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvatarInput size={96} src={values.meta ? values.meta.logo : null} name={values.name || initialValues.name} showStatus={false} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="Name" name="name" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Tagline" name="meta.tagline" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="Phone" name="phone.number" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Email" name="email.address" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="Website" name="website.url" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TitleSeparator title="Chat Defaults" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="Welcome Message" name="welcome.message" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Default Response" name="response" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TitleSeparator title="Availability" />
                    </Col>
                </Row>
            </Grid>
        </Root>
    );
};

const OrganizationSettingsForm = () => {
    const [{ organization }] = useAuth();
    return (
        <Formik {...{ validationSchema }} initialValues={organization} children={renderForm} />
    )
}

export default OrganizationSettingsForm;
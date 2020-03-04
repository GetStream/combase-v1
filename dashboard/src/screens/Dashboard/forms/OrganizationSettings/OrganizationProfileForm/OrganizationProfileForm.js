import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button } from '@comba.se/ui';

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Components //
import AvatarField from 'shared/AvatarField';
import { Col, Grid, Row } from 'shared/Grid';
import InputField from 'shared/InputField';
import ColorField from 'shared/ColorField';
import SectionTitle from 'shared/SectionTitle';

import validationSchema from './validationSchema';

const Root = styled.form`
    flex: 1;
    & > * + * {
        margin-top: 8px;
    }
`;

const AvatarCol = styled(Col)`
    margin-bottom: 32px;
`

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const FormFooter = styled(Col)`
    margin-top: 24px;
    align-items: flex-end;
`

const renderForm = ({ dirty, handleSubmit, initialValues, isValid, values }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Organization Profile" />
                    </Col>
                </Row>
                <Row>
                    <AvatarCol>
                        <AvatarField name="meta.branding.logo" size={96} avatarName={values.name || initialValues.name} showStatus={false} />
                    </AvatarCol>
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
                    <Col sm={6}>
                        <ColorField placeholder="Color" name="meta.branding.colors.primary" />
                    </Col>
                </Row>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
            </Grid>
        </Root>
    );
};

const OrganizationProfileForm = () => {
    const [{ user, organization }, { refetchCurrentOrg }] = useAuth();
    const { queueSnackbar } = useSnackbar();

    const handleSubmit = useCallback(
        async ({ _id, updatedAt, createdAt, ...values }) => {
            try {
                await request(`v1/organizations/${_id}`, 'put', {
                    body: JSON.stringify(values)
                }, user.tokens.api);
                await refetchCurrentOrg();
                queueSnackbar({
                    isError: false,
                    replace: true,
                    text: "Organization profile updated! 🥳"
                });
            } catch (error) {
                queueSnackbar({
                    isError: true,
                    replace: true,
                    text: "Something went wrong!"
                });
            }
        },
        [queueSnackbar, user.tokens.api, refetchCurrentOrg]
    );

    return (
        <Formik {...{ validationSchema }} enableReinitialize onSubmit={handleSubmit} initialValues={organization} children={renderForm} />
    )
};



export default OrganizationProfileForm;
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Component //
import AvatarField from 'shared/AvatarField';
import Button from 'shared/Button';
import { Col, Grid, Row } from 'shared/Grid';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';
import Text from 'shared/Text';

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

const AvatarCol = styled(Col)`
    margin-bottom: 32px;
`

const InputInfo = styled.div`
    padding: 12px 12px 4px 12px;
`;

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
                </Row>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
                <Row>
                    <Col>
                        <TitleSeparator title="Chat Defaults" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputInfo>
                            <Text weight="500" size={14} color="primary">Welcome Message</Text>
                            <Text size={12} line={20} faded>The welcome message that will be displayed as soon as a user starts a new thread.</Text>
                        </InputInfo>
                        <InputField textarea name="welcome.message" />
                    </Col>
                    <Col sm={6}>
                        <InputInfo>
                            <Text weight="500" size={14} color="primary">Response</Text>
                            <Text size={12} line={20} faded>The default auto-repsonse message that will send as soon as a user sends their first message.</Text>
                        </InputInfo>
                        <InputField textarea name="response" />
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
}

export default OrganizationSettingsForm;
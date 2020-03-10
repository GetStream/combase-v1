import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button } from '@comba.se/ui';

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Component //
import AvatarField from 'shared/AvatarField';
import { Col, Grid, Row } from 'shared/Grid';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';

import validationSchema from './validationSchema';

const Root = styled.form`
    & > * + * {
        margin-top: 8px;
    }
`;

const AvatarCol = styled(Col)`
    margin-bottom: 32px;
`

const FormRow =  styled(Row)`
    & + & {
        margin-top: 12px;
    }
`

const FormFooter = styled(Col)`
    margin-top: 24px;
    align-items: flex-end;
`

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const renderForm = ({ dirty, handleSubmit, initialValues, isValid, values }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Your Profile" />
                    </Col>
                </Row>
                <Row>
                    <AvatarCol>
                        <AvatarField name="image" size={96} avatarName={values.name.first || initialValues.name.first} showStatus={false} />
                    </AvatarCol>
                </Row>
                <FormRow>
                    <Col sm={6}>
                        <InputField placeholder="First Name" name="name.first" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Last Name" name="name.last" />
                    </Col>
                </FormRow>
                <FormRow>
                    <Col sm={6}>
                        <InputField placeholder="Email" name="email" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Title" name="title" />
                    </Col>
                </FormRow>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
            </Grid>
        </Root>
    );
};

const UserSettingsForm = () => {
    const [{ user }, { refetchUser }] = useAuth();
    const { queueSnackbar } = useSnackbar();
    const handleSubmit = useCallback(
        async ({ _id, updatedAt, createdAt, ...values }) => {
            try {
                await request(`v1/agents/${_id}`, 'put', {
                    body: JSON.stringify(values)
                }, user.tokens.api);
                await refetchUser();
                queueSnackbar({
                    isError: false,
                    replace: true,
                    text: "Your profile was updated! 🥳"
                });
            } catch (error) {
                queueSnackbar({
                    isError: true,
                    replace: true,
                    text: "Something went wrong!"
                });
            }
        },
        [queueSnackbar, user.tokens.api, refetchUser]
    );

    return (
        <Formik {...{ validationSchema }} enableReinitialize onSubmit={handleSubmit} initialValues={user} children={renderForm} />
    )
}

export default UserSettingsForm;
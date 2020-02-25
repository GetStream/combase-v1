import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Component //
import AvatarField from 'shared/AvatarField';
import Button from 'shared/Button';
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

const FormFooter = styled(Col)`
    margin-top: 24px;
    align-items: flex-end;
`

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const renderForm = ({ dirty, initialValues, isValid, values }) => {
    return (
        <Root>
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
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="First Name" name="name.first" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Last Name" name="name.last" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <InputField placeholder="Email" name="email" />
                    </Col>
                    <Col sm={6}>
                        <InputField placeholder="Title" name="title" />
                    </Col>
                </Row>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
                <Row>
                    <Col>
                        <TitleSeparator title="Your Availability" />
                    </Col>
                </Row>
            </Grid>
        </Root>
    );
};

const UserSettingsForm = () => {
    const [{ user }] = useAuth();
    return (
        <Formik {...{ validationSchema }} initialValues={user} children={renderForm} />
    )
}

export default UserSettingsForm;
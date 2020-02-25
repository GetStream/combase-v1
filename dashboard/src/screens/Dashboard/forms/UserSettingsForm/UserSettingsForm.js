import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Component //
import Avatar from 'shared/Avatar';
import { Col, Grid, Row } from 'shared/Grid';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';

const Root = styled.form`
    & > * + * {
        margin-top: 8px;
    }
`;

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const renderForm = ({ values }) => {
    console.log(values);
    return (
        <Root>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Your Profile" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Avatar size={96} src={values.image || null} name={values.name.first} showStatus={false} />
                    </Col>
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
        <Formik initialValues={user} children={renderForm} />
    )
}

export default UserSettingsForm;
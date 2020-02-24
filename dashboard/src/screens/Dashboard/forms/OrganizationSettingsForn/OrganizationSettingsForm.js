import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Component //
import Avatar from 'shared/Avatar';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';

const Root = styled.form`
    & > * + * {
        margin-top: 16px;
    }
`;

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
`

const renderForm = ({ values }) => {
    console.log(values);
    return (
        <Root>
            <TitleSeparator title="Organization Profile" />
            <Avatar size={96} src={values.meta ? values.meta.logo : null} name={values.name} showStatus={false} />
            <InputField placeholder="Name" name="name" />
            <InputField placeholder="Tagline" name="meta.tagline" />
            <InputField placeholder="Phone" name="phone.number" />
            <InputField placeholder="Email" name="email.address" />
            <TitleSeparator title="Chat Defaults" />
            <InputField placeholder="Welcome Message" name="welcome.message" />
            <InputField placeholder="Default Response" name="response" />
        </Root>
    );
};

const OrganizationSettingsForm = () => {
    const [{ organization }] = useAuth();
    return (
        <Formik initialValues={organization} children={renderForm} />
    )
}

export default OrganizationSettingsForm;
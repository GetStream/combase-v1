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
            <TitleSeparator title="Your Profile" />
            <Avatar size={96} src={values.image || null} name={values.name.first} showStatus={false} />
            <InputField placeholder="First Name" name="name.first" />
            <InputField placeholder="Last Name" name="name.last" />
            <InputField placeholder="Email" name="email" />
            <InputField placeholder="Title" name="title" />
            {/* <InputField placeholder="Tagline" name="meta.tagline" />
            <InputField placeholder="Phone" name="phone.number" />
            <InputField placeholder="Email" name="email.address" />
            <InputField placeholder="Website" name="website.url" />
            <TitleSeparator title="Chat Defaults" />
            <InputField placeholder="Welcome Message" name="welcome.message" />
            <InputField placeholder="Default Response" name="response" />
            <TitleSeparator title="Availability" /> */}
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
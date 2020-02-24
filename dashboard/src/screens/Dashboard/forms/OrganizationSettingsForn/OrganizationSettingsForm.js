import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Component //
import Avatar from 'shared/Avatar';
import InputField from 'shared/InputField';
import SectionTitle from 'shared/SectionTitle';
import AutoSizeTextArea from 'shared/AutoSizeTextArea';

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
            <TitleSeparator title="Organization Profile" />
            <Avatar size={96} src={values.meta ? values.meta.logo : null} name={values.name} showStatus={false} />
            <InputField placeholder="Name" name="name" />
            <InputField placeholder="Tagline" name="meta.tagline" />
            <InputField placeholder="Phone" name="phone.number" />
            <InputField placeholder="Email" name="email.address" />
            <InputField placeholder="Website" name="website.url" />
            <TitleSeparator title="Chat Defaults" />
            <InputField placeholder="Welcome Message" name="welcome.message" />
            <InputField placeholder="Default Response" name="response" />
            <TitleSeparator title="Availability" />
            <AutoSizeTextArea />
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
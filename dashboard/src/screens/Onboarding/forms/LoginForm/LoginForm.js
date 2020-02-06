import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';

// Components //
import InputField from 'shared/InputField';
import Button from 'shared/Button';
import { MailIcon, PasswordIcon } from 'shared/Icons';
import validationSchema from './validationSchema';

const Root = styled.form`
    & > * + * {
        margin-top: 16px;
    }
`;

const ButtonsWrapper = styled.div`
    margin-top: 24px;

    & > * + * {
        margin-top: 16px;
    }
`;

const initialValues = {
    email: '',
    password: '',
};

const renderForm = ({ handleSubmit }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <InputField icon={MailIcon} name="email" placeholder="Email" />
            <InputField
                icon={PasswordIcon}
                name="password"
                placeholder="Password"
                type="password"
            />
            <ButtonsWrapper>
                <Button type="submit" label="Login" />
                <Button flat color="red" label="Forgot Password" />
            </ButtonsWrapper>
        </Root>
    );
};

export default () => {
    const handleSubmit = useCallback(values => {
        console.log(values);
    }, []);
    return (
        <Formik
            {...{ initialValues, validationSchema }}
            onSubmit={handleSubmit}
            children={renderForm}
        />
    );
};

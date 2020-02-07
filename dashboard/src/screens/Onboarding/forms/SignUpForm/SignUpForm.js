import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

// Components //
import InputField from 'shared/InputField';
import Button from 'shared/Button';
import { MailIcon, PasswordIcon, UserIcon } from 'shared/Icons';
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
    name: {
        first: '',
        last: '',
    },
    email: '',
    password: '',
    confirm: '',
};

const renderForm = ({ dirty, handleSubmit, isValid }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <InputField
                icon={UserIcon}
                name="name.first"
                placeholder="First Name"
            />
            <InputField
                icon={UserIcon}
                name="name.last"
                placeholder="Last Name"
            />
            <InputField icon={MailIcon} name="email" placeholder="Email" />
            <InputField
                icon={PasswordIcon}
                name="password"
                placeholder="Password"
                type="password"
            />
            <InputField
                icon={PasswordIcon}
                name="confirm"
                placeholder="Confirm Password"
                type="password"
            />
            <ButtonsWrapper>
                <Button disabled={!dirty || !isValid} type="submit" label="Create Account" />
            </ButtonsWrapper>
        </Root>
    );
};

export default () => {
    const handleSubmit = useCallback(values => {
        console.log('create account', values);
    }, []);
    return (
        <Formik
            {...{ initialValues, validationSchema }}
            onSubmit={handleSubmit}
            children={renderForm}
        />
    );
};

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

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
            <InputField
                icon={MailIcon}
                name="name.first"
                placeholder="First Name"
            />
            <InputField
                icon={MailIcon}
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
                <Button type="submit" label="Create Account" />
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

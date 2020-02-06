import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';

// Components //
import Button from 'shared/Button';
import validationSchema from './validationSchema';

const Root = styled.form``;

const initialValues = {
    email: '',
    password: '',
};

const renderForm = ({ errors, handleSubmit }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <Field name="email" placeholder="Email" />
            <Field name="password" placeholder="Password" type="password" />
            <Button type="submit" label="Login" />
            <Button flat color="red" label="Forgot Password" />
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

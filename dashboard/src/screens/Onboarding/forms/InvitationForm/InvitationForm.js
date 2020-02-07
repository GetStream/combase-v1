import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';

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
    align-items: center;

    & > * + * {
        margin-top: 16px;
    }
`;

const initialValues = {
    invitations: [],
};

const renderForm = ({ handleSubmit }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <FieldArray name="invitations" />
            <ButtonsWrapper>
                <Button type="submit" label="Invite" />
            </ButtonsWrapper>
        </Root>
    );
};

export default () => {
    const [user, { login }] = useAuth(); // eslint-disable-line no-unused-vars
    const location = useLocation();
    const history = useHistory();
    const handleSubmit = useCallback(
        values => {
            login(values.email, values.password);
            if (location.state.next) {
                history.push(location.state.next);
            }
        },
        [history, location, login]
    );
    return (
        <Formik
            {...{ initialValues, validationSchema }}
            onSubmit={handleSubmit}
            children={renderForm}
        />
    );
};

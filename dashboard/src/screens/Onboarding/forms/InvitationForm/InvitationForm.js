import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { FieldArray, Formik } from 'formik';

// Hooks //
import useAuth from 'hooks/useAuth';

// Components //
import IconButton from 'shared/IconButton';
import InputField from 'shared/InputField';
import Button from 'shared/Button';
import { CancelIcon, MailIcon, PasswordIcon } from 'shared/Icons';
import validationSchema from './validationSchema';

const Root = styled.form`
    & > * + * {
        margin-top: 16px;
    }
`;

const Invites = styled.div`
    flex: 1;
`;

const Invite = styled.div`
    flex-direction: row;
    align-items: center;
    padding: 8px 0px;

    & > * + * {
        margin-left: 16px;
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
    invitations: [
        {
            email: '',
            name: {
                first: '',
                last: '',
            },
        },
        {
            email: '',
            name: {
                first: '',
                last: '',
            },
        },
        {
            email: '',
            name: {
                first: '',
                last: '',
            },
        },
    ],
};

const InvitationsField = ({ canDelete, invitation, index, remove }) => {
    return (
        <Invite>
            <InputField
                name={`invitations.${index}.email`}
                placeholder="Email"
            />
            <InputField
                name={`invitations.${index}.name.first`}
                placeholder="First Name"
            />
            <InputField
                name={`invitations.${index}.name.last`}
                placeholder="Last Name"
            />
            <IconButton disabled={!canDelete} size={16} color="red" icon={CancelIcon} onClick={() => remove(index)} />
        </Invite>
    );
};

const renderInviteInputs = ({ form, push, remove }, data) => {
    const {
        values: { invitations },
    } = form;
    return (
        <Invites>
            {invitations.map((invitation, index) => (
                <InvitationsField {...{ invitation, index, remove }} canDelete={invitations.length > 1} />
            ))}
            <ButtonsWrapper>
                <Button flat label="Add User" onClick={push} />
            </ButtonsWrapper>
        </Invites>
    );
};

const renderForm = ({ handleSubmit }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <FieldArray name="invitations" render={renderInviteInputs} />
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

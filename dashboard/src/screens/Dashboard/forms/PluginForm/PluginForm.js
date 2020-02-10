import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

// utils //
import request from 'utils/request';

// Contexts //
import AuthContext from 'contexts/Auth';

// Components //
import InputField from 'shared/InputField';
import Button from 'shared/Button';

const Root = styled.form`
    & > * + * {
        margin-top: 16px;
    }
`;

const ButtonsWrapper = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    & > * + * {
        margin-left: 16px;
    }
`;

const renderFields = (input, key) => <InputField {...input} {...{ key }} />;

const renderForm = ({ dirty, handleSubmit }, fields, history) => {
    return (
        <Root onSubmit={handleSubmit}>
            {fields.map(renderFields)}
            <ButtonsWrapper>
                <Button
                    flat
                    color="red"
                    label="Cancel"
                    onClick={history.goBack}
                />
                <Button disabled={!dirty} type="submit" label="Save" />
            </ButtonsWrapper>
        </Root>
    );
};

export default ({ slug, fields }) => {
    const user = useContext(AuthContext);
    const history = useHistory();
    const initialValues = useMemo(() => {
        let values = {};
        fields.forEach(({ name }) => {
            values[name] = '';
        });
        return values;
    }, [fields]);

    const handleSubmit = useCallback(
        async values => {
            try {
                const keys = Object.keys(values);
                await request(
                    'v1/plugins',
                    'post',
                    {
                        body: JSON.stringify({
                            name: slug,
                            keys: keys.map(key => ({
                                name: key,
                                value: values[key],
                            })),
                            refs: {
                                organization: user.refs.organization._id,
                            },
                        }),
                    },
                    user.tokens.api
                );
            } catch (error) {
                // TODO: Snackbar
                console.log(error);
            }
        },
        [user, slug]
    );
    return (
        <Formik
            {...{ initialValues }}
            onSubmit={handleSubmit}
            children={form => renderForm(form, fields, history)}
        />
    );
};

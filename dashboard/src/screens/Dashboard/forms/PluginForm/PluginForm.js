import React, { useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

// utils //
import request from 'utils/request';

// Contexts //
import { useSnackbar } from 'contexts/Snackbar';
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

const renderForm = ({ dirty, handleSubmit }, fields, history, loading) => {
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
                <Button
                    disabled={loading || !dirty}
                    type="submit"
                    label="Save"
                />
            </ButtonsWrapper>
        </Root>
    );
};

export default ({ data, onSubmit, slug, fields }) => {
    const { queueSnackbar } = useSnackbar();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const initialValues = useMemo(() => {
        let values = {};
        fields.forEach(({ name }) => {
            let value = null;
            if (data) {
                value = data.keys.find(({ name: keyName }) => keyName === name)
                    .value;
            }
            values[name] = value || '';
        });
        return values;
    }, [data, fields]);

    const handleSubmit = useCallback(
        async values => {
            try {
                setLoading(true);
                const keys = Object.keys(values);
                await request(
                    data ? `v1/plugins/${data._id}` : 'v1/plugins',
                    data ? 'put' : 'post',
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
                if (onSubmit) {
                    await onSubmit();
                }
                setLoading(false);
                queueSnackbar({
                    isError: false,
                    text: 'Plugin configuration updated.',
                });
            } catch (error) {
                setLoading(false);
                queueSnackbar({
                    replace: true,
                    isError: true,
                    text: error.message,
                });
                console.log(error);
            }
        },
        [data, onSubmit, user, slug, queueSnackbar]
    );
    return (
        <Formik
            {...{ initialValues }}
            enableReinitialize
            onSubmit={handleSubmit}
            children={form => renderForm(form, fields, history, loading)}
        />
    );
};

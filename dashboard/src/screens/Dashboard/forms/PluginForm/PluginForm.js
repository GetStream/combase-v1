import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

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

const renderForm = ({ dirty, handleSubmit, values }, fields, history) => {
    console.log(values);
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

export default ({ fields }) => {
    const history = useHistory();
    const initialValues = useMemo(() => {
        let values = {};
        fields.forEach(({ name }) => {
            values[name] = '';
        });
        return values;
    }, [fields]);
    const handleSubmit = useCallback(values => {
        console.log(values);
    }, []);
    return (
        <Formik
            {...{ initialValues }}
            onSubmit={handleSubmit}
            children={form => renderForm(form, fields, history)}
        />
    );
};

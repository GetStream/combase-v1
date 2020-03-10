import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Button } from '@comba.se/ui';
import { Col, Grid, Row } from '@comba.se/ui/Grid';

// Utils //
import request from 'utils/request';

// Hooks //
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'contexts/Snackbar';

// Component //
import AvailabilityField from 'components/AvailabilityField';
import SectionTitle from 'shared/SectionTitle';

import validationSchema from './validationSchema';

const Root = styled.form`
    & > * + * {
        margin-top: 8px;
    }
`;

const FormFooter = styled(Col)`
    margin-top: 24px;
    align-items: flex-end;
`

const TitleSeparator = styled(SectionTitle)`
    margin-top: 32px;
    margin-bottom: 16px;
`

const renderForm = ({ dirty, handleSubmit, initialValues, isValid, values }) => {
    return (
        <Root onSubmit={handleSubmit}>
            <Grid fluid>
                <Row>
                    <Col>
                        <TitleSeparator title="Your Availability" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvailabilityField name="availability" />
                    </Col>
                </Row>
                <Row>
                    <FormFooter>
                        <Button disabled={!dirty || !isValid} label="Save" type="submit" />
                    </FormFooter>
                </Row>
            </Grid>
        </Root>
    );
};

const UserAvailabilityForm = () => {
    const [{ user }, { refetchUser }] = useAuth();
    const { queueSnackbar } = useSnackbar();
    const handleSubmit = useCallback(
        async (values) => {
            try {
                await request(`v1/agents/${user._id}`, 'put', {
                    body: JSON.stringify(values)
                }, user.tokens.api);
                await refetchUser();
                queueSnackbar({
                    isError: false,
                    replace: true,
                    text: "Your availability was updated! 🥳"
                });
            } catch (error) {
                queueSnackbar({
                    isError: true,
                    replace: true,
                    text: "Something went wrong!"
                });
            }
        },
        [queueSnackbar, user._id, user.tokens.api, refetchUser]
    );
    const initialValues = useMemo(() => {
        return { availability: user.availability }
    }, [user.availability]);

    return (
        <Formik {...{ initialValues, validationSchema }} enableReinitialize onSubmit={handleSubmit} children={renderForm} />
    )
}

export default UserAvailabilityForm;
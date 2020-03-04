import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import { Button } from '@comba.se/ui';
import { MailIcon, PasswordIcon, UserIcon } from "@comba.se/ui/Icons";

// Utils //
import request from "utils/request";

// Context //
import SnackbarContext from "contexts/Snackbar";

// Components //
import InputField from "shared/InputField";
import validationSchema from "./validationSchema";

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
    first: "",
    last: ""
  },
  email: "",
  password: "",
  confirm: ""
};

const renderForm = ({ dirty, handleSubmit, isValid }) => {
  return (
    <Root onSubmit={handleSubmit}>
      <InputField icon={UserIcon} name="name.first" placeholder="First Name" />
      <InputField icon={UserIcon} name="name.last" placeholder="Last Name" />
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
        <Button
          disabled={!dirty || !isValid}
          type="submit"
          label="Create Account"
        />
      </ButtonsWrapper>
    </Root>
  );
};

export default ({ organizationId, invitationId }) => {
  const history = useHistory();
  const { queueSnackbar } = useContext(SnackbarContext);
  const handleSubmit = useCallback(
    async values => {
      try {
        const { confirm, ...user } = values;

        await request("v1/agents", "post", {
          body: JSON.stringify({
            ...user,
            refs: { organization: organizationId }
          })
        });

        await request(`v1/invites/${invitationId}`, "put", {
          body: JSON.stringify({
            accepted: true
          })
        });

        history.push("/auth/login");
      } catch (error) {
        queueSnackbar({
          error: error.message
        });
      }
    },
    [history, invitationId, organizationId, queueSnackbar]
  );
  return (
    <Formik
      {...{ initialValues, validationSchema }}
      onSubmit={handleSubmit}
      children={renderForm}
    />
  );
};

import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { Formik } from "formik";

// Hooks //
import useAuth from "hooks/useAuth";

// Components //
import InputField from "shared/InputField";
import Button from "shared/Button";
import { MailIcon, PasswordIcon } from "shared/Icons";
import validationSchema from "./validationSchema";

const Root = styled.form`
  & > * + * {
    margin-top: 8px;
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: 24px;

  & > * + * {
    margin-top: 16px;
  }
`;

const initialValues = {
  email: "",
  password: ""
};

const renderForm = ({ dirty, handleSubmit, isValid }) => {
  return (
    <Root onSubmit={handleSubmit}>
      <InputField icon={MailIcon} name="email" placeholder="Email" />
      <InputField
        icon={PasswordIcon}
        name="password"
        placeholder="Password"
        type="password"
      />
      <ButtonsWrapper>
        <Button disabled={!isValid} type="submit" label="Login" />
        <Button flat color="red" label="Forgot Password" />
      </ButtonsWrapper>
    </Root>
  );
};

export default () => {
  const [{ user }, { login }] = useAuth(); // eslint-disable-line no-unused-vars
  const location = useLocation();
  const history = useHistory();
  const handleSubmit = useCallback(
    values => {
      try {
        login(values.email, values.password);
        if (location.state.next) {
          history.push(location.state.next);
        }
      } catch (error) {
        console.error(error);
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

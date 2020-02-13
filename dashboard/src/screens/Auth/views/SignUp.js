import React from "react";
import styled from "styled-components";

// Hooks //
import useInvite from "hooks/useInvite";

// Forms //
import SignUpForm from "../forms/SignUpForm";

// Components //
import Container from "shared/Container";
import LoadingState from "shared/LoadingState";
import Text from "shared/Text";

const Root = styled(Container)`
  flex: 1;
  justify-content: center;
`;

const Header = styled.div`
  padding: 32px 0px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SignUp = ({ match }) => {
  const [invite, { loading, error, expired }] = useInvite(
    match.params.inviteId
  );

  if (loading) {
    return <LoadingState />;
  }

  if (expired) {
    return (
      <Root>
        <Header>
          <Text size={40} weight="700">
            Invitation Expired
          </Text>
        </Header>
      </Root>
    );
  }

  if (error) {
    return <Root>Error</Root>;
  }

  console.log(invite);

  return (
    <Root maxWidth={424}>
      <Header>
        <Text size={40} weight="700">
          Create an Account
        </Text>
      </Header>
      <SignUpForm />
    </Root>
  );
};

export default SignUp;

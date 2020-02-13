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
  const [invite, { loading }] = useInvite(match.params.inviteId);
  console.log(invite);
  if (loading) {
    return <LoadingState />;
  }
  return (
    <Root maxWidth={400}>
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

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
import Avatar from "shared/Avatar";

const Root = styled(Container)`
  flex: 1;
  justify-content: center;
`;

const Header = styled.div`
  padding: 32px 0px;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > ${Text}:first-of-type {
    margin-top: 8px;
  }

  & > ${Text} + ${Text} {
    margin-top: 8px;
  }
`;

const SignUp = ({ match }) => {
  const [invite, { loading, error, expired }] = useInvite(
    match.params.inviteId
  );

  if (loading) {
    return <LoadingState />;
  }
  console.log(invite);
  if (expired) {
    return (
      <Root maxWidth={424}>
        <Header>
          <Avatar
            src={invite.refs.organization.meta.branding.logo}
            name={invite.refs.organization.name}
            size={80}
            showStatus={false}
          />
          <Text size={40} weight="700">
            Invitation Expired!
          </Text>
          <Text color="alt_text" line={24}>
            This invitation link has expired, please request another invitation
            from an admin at {invite.refs.organization.name}.
          </Text>
        </Header>
      </Root>
    );
  }

  if (error || !invite) {
    return (
      <Root>
        <Header>
          <Text size={40} weight="700">
            Something went wrong!
          </Text>
          <Text color="alt_text" line={24}>
            This invitation either doesn't exist or something is very wrong,
            please contact your system admin.
          </Text>
        </Header>
      </Root>
    );
  }

  return (
    <Root maxWidth={424}>
      <Header>
        <Avatar
          name={invite.refs.organization.name}
          src={invite.refs.organization.meta.branding.logo}
          size={80}
          showStatus={false}
        />
        <Text size={40} weight="700">
          Create an Account
        </Text>
        <Text color="alt_text">
          Sign up below to activate your account at{" "}
          {invite.refs.organization.name}
        </Text>
      </Header>
      <SignUpForm
        organizationId={invite.refs.organization._id}
        invitationId={invite._id}
      />
    </Root>
  );
};

export default SignUp;

import { useContext } from "react";
import AuthContext from "contexts/Auth";

export default () => {
  const {
    user,
    organization,
    organizations,
    loading,
    error,
    login,
    logout,
    setCurrentOrganization,
    refetchCurrentOrg,
  } = useContext(AuthContext);
  return [
    { organization, organizations, user },
    { loading, error, login, logout, setCurrentOrganization, refetchCurrentOrg }
  ];
};

import { useContext } from "react";
import AuthContext from "contexts/Auth";

export default () => {
  const {
    isFirstVisit,
    user,
    organization,
    organizations,
    loading,
    error,
    login,
    logout,
    setCurrentOrganization,
    refetchCurrentOrg,
    refetchUser,
  } = useContext(AuthContext);
  return [
    { organization, organizations, user },
    { loading, error, login, logout, setCurrentOrganization, refetchCurrentOrg, refetchUser, isFirstVisit }
  ];
};

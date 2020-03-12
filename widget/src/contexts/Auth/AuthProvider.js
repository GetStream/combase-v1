import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from 'styled-components';
import request from "utils/request";

import AuthContext from "./index";
import SnackbarContext from "@comba.se/ui/Snackbar";
import { LoadingState } from "@comba.se/ui";

const LoadingRoot = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const dummyUser = {
  "name": {
    "first": "Josh",
    "last": "Tilton"
  },
  "email": {
    "verified": true,
    "address": "josh@getstream.io"
  },
  "refs": {
    "tags": [],
    "organization": {
      "meta": {
        "branding": {
          "colors": {
            "primary": "#00d084"
          },
          "logo": "http://res.cloudinary.com/hxx1zzrux/image/upload/v1582662535/edqfwsuqr4a75dfltxtn.png"
        },
        "tagline": "Ship Activity Feeds & Chat faster than ever before."
      },
      "phone": {
        "display": true,
        "number": "+17206123845"
      },
      "email": {
        "display": true,
        "address": "support@getstream.io"
      },
      "website": {
        "display": true,
        "url": "https://getstream.io"
      },
      "welcome": {
        "message": "Welcome! How can we help?",
        "enabled": false
      },
      "settings": {
        "faqs": false,
        "transcripts": true
      },
      "response": "We typically reply in a few minutes.",
      "_id": "5e541df992a1f64016ab8357",
      "availability": {
        "hours": {
          "from": "9:00 am",
          "to": "6:00 pm"
        },
        "days": "Daily"
      },
      "name": "Stream",
      "domains": [],
      "updatedAt": "2020-03-10T13:09:25.676Z",
      "createdAt": "2020-02-24T19:03:21.024Z",
      "__v": 0
    }
  },
  "phone": "",
  "_id": "5e5552961e7f700abd0dff23",
  "updatedAt": "2020-02-25T17:00:06.052Z",
  "createdAt": "2020-02-25T17:00:06.052Z",
}

export default ({ children }) => {
  const { queueSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(
    // JSON.parse(localStorage.getItem("user")) || null
    dummyUser
  );

  const [organization, setOrg] = useState(
    JSON.parse(localStorage.getItem("organization")) || null
  );

  const getOrg = useCallback(async () => {
    try {
      setLoading(true);
      const data = await request(`v1/organizations/${process.env.REACT_APP_ORGANIZATION_ID}`, "get");
      localStorage.setItem("organization", JSON.stringify(data));
      setOrg(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const data = await request("v1/auth/login", "post", {
          body: JSON.stringify({
            email,
            password
          })
        });
        data.id = data._id;
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        queueSnackbar({
          isError: true,
          text: error.message
        });
        setLoading(false);
        setError(error);
      }
    },
    [queueSnackbar]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    getOrg();
  }, [getOrg]);

  const refetchUser = useCallback(async () => {
    const data = await request(`v1/agents/${user._id}`, "get");
    const userData = { tokens: user.tokens, ...data };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, [user]);

  const refetchCurrentOrg = useCallback(async () => {
    const org = await request(`v1/organizations/${organization._id}`, "get");
    localStorage.setItem("organization", JSON.stringify(org));
    setOrg(org);
  }, [organization]);

  const value = useMemo(
    () => ({
      organization,
      refetchCurrentOrg,
      refetchUser,
      user,
      loading,
      error,
      login,
      logout
    }),
    [
      organization,
      refetchCurrentOrg,
      refetchUser,
      user,
      loading,
      error,
      login,
      logout
    ]
  );

  if (loading || !organization) {
    return (
      <LoadingRoot>
        <LoadingState />
      </LoadingRoot>
    );
  }
  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
};

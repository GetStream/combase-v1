import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from 'styled-components';
import request from "utils/request";
import { useInitClient } from 'stream-chat-hooks';
import { ChannelsProvider } from 'stream-chat-hooks/contexts/Channels';
import { ChatProvider } from 'stream-chat-hooks/contexts/Chat';

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
    JSON.parse(localStorage.getItem("user")) || null
    // dummyUser
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

  const client = useInitClient('pyst6tqux4vf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWU1NTUyOTYxZTdmNzAwYWJkMGRmZjIzIn0.Z1WIshH9NZ54eVbcGeNOcfVSNGjUEOtLJ2FDuTfbtVI');

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

  const refetchUser = useCallback(async () => {
    const data = await request(`v1/users/${user._id}`, "get");
    const userData = { tokens: user.tokens, ...data };
    localStorage.setItem("user", JSON.stringify(userData));
    await client.setUser({ id: userData._id, name: `${userData.name.first} ${userData.name.last.charAt(0)}.` })
    setUser(userData);
  }, [client, user]);

  const refetchCurrentOrg = useCallback(async () => {
    const org = await request(`v1/organizations/${process.env.REACT_APP_ORGANIZATION_ID}`, "get");
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


  const authorizeUser = useCallback(async () => {
    if (user) {
      await client.setUser({
        id: user._id,
        name: `${user.name.first} ${user.name.last.charAt(0)}.`
      });
      refetchUser();
    } else {
      await client.setAnonymousUser();
      setUser({ _id: '!anon' });
      setLoading(false);
    }
  }, [client, user]);

  useEffect(() => {
    if (client) {
      authorizeUser();
    }
  }, [client]);

  if (loading || !client) {
    return null
  }

  return (
    <ChatProvider client={client}>
      <ChannelsProvider>
        <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>
      </ChannelsProvider>
    </ChatProvider>
  );
};

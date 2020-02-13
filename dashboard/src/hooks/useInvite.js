import { useCallback, useContext, useEffect, useState } from "react";

// Contexts //
import AuthContext from "contexts/Auth";
import SnackbarContext from "contexts/Snackbar";

// Utils //
import request from "utils/request";

export default inviteId => {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { queueSnackbar } = useContext(SnackbarContext);
  const fetchInvite = useCallback(async () => {
    if (inviteId) {
      try {
        setLoading(true);
        const invite = await request(`v1/invites/${inviteId}`, "get");
        setLoading(false);
        setInvite(invite);
      } catch (error) {
        setLoading(false);
        setError(true);
        queueSnackbar({
          isError: true,
          text: error.message
        });
      }
    }
  }, [inviteId]);

  useEffect(() => {
    fetchInvite();
  }, [fetchInvite]);

  return [invite, { loading, error }];
};

import { useCallback, useEffect, useState } from "react";
import moment from "moment";

// Utils //
import request from "utils/request";

export default inviteId => {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expired, setExpired] = useState(false);

  const fetchInvite = useCallback(async () => {
    if (inviteId) {
      try {
        setLoading(true);
        const invite = await request(`v1/invites/${inviteId}`, "get");
        setLoading(false);
        if (invite.error) {
          throw new Error("Something went wrong");
        }

        if (
          !moment(invite.expiration).isBefore(moment().subtract("48", "hours"))
        ) {
          throw new Error("Invitation Expired");
        }
        setInvite(invite);
      } catch (error) {
        setLoading(false);
        if (error.message === "Invitation Expired") {
          setExpired(true);
        } else {
          setError(true);
        }
      }
    }
  }, [inviteId]);

  useEffect(() => {
    fetchInvite();
  }, [fetchInvite]);

  return [invite, { loading, error, expired }];
};

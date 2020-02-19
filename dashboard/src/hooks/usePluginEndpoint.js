import { useCallback, useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import request from "utils/request";

export default (plugin, endpoint, reqBody) => {
  const [{ user }] = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const enriched = await request(
        `v1/plugins/${plugin}/${endpoint}`,
        "post",
        {
          body: JSON.stringify(reqBody)
        },
        user.tokens.api
      );
      setData(enriched);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [endpoint, plugin, reqBody, user.tokens.api]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, { loading, error, refetch: getData }];
};

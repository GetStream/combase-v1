import { useCallback, useEffect, useState } from "react";
import moment from "moment";

export default (time = Date.now(), interval = 10000) => {
  const [momentValue, setMoment] = useState(moment(time));
  const tick = useCallback(() => {
    setMoment(moment(time));
  }, [time]);

  useEffect(() => {
    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [tick, interval]);

  return momentValue;
};

import React, { useContext, useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import { ThemeContext } from "styled-components";

export default (breakpoint, minmax = "min") => {
  const [matches, setMatch] = useState(false);

  if (!breakpoint) {
    throw new Error("Must provide a breakpoint");
  }

  const theme = useContext(ThemeContext);

  // eslint-disable-next-line no-undef
  const query = window.matchMedia(
    `(${minmax}-width: ${theme.breakpoints[breakpoint]}px)`
  );

  useEffect(() => setMatch(!query.matches), []);

  const handleChange = ({ matches: isMatched }) => setMatch(!isMatched);

  useEffect(() => {
    query.onchange = handleChange;
    return query.removeListener(handleChange);
  }, []);

  return matches;
};

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Components //
const Root = styled.div``;

const ClearbitWidget = ({ email }) => {
  return <Root>Clearbit Widget {email}</Root>;
};

ClearbitWidget.propTypes = {
  email: PropTypes.string.isRequired
};

export default ClearbitWidget;

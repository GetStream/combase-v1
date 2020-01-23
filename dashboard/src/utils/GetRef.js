import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class GetRef extends React.Component {
  componentDidMount() {
    this.ref = ReactDOM.findDOMNode(this);
    this.props.rootRef(this.ref);
  }

  componentDidUpdate(prevProps) {
    const ref = ReactDOM.findDOMNode(this);

    if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
      if (prevProps.rootRef !== this.props.rootRef) {
        prevProps.rootRef(null);
      }

      this.ref = ref;
      this.props.rootRef(this.ref);
    }
  }

  componentWillUnmount() {
    this.ref = null;
    this.props.rootRef(null);
  }

  render() {
    return this.props.children;
  }
}

GetRef.propTypes = {
  children: PropTypes.element,
  // Provide a way to access the DOM node of the wrapped element.
  // You can provide a callback ref or a `React.createRef()` ref.
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export default GetRef;

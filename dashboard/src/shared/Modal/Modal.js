import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import keycode from "keycode";
import styled from "styled-components";
import ScrollLock from "react-scrolllock";
import Animated from "animated/lib/targets/react-dom";
import Easing from "animated/lib/Easing";

// Utils //
import GetRef from "utils/GetRef";

// Components //
import Portal from "shared/Portal";
import Undersheet from "./Undersheet";

const ModalRoot = styled(Animated.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  z-index: ${({ theme }) => theme.z.modal};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
`;

class Modal extends Component {
  _anim = new Animated.Value(0);

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false
      };
    }

    return null;
  }

  static propTypes = {
    animated: PropTypes.bool,
    animatedValue: PropTypes.instanceOf(Animated.Value),
    children: PropTypes.element,
    className: PropTypes.string,
    closeDuration: PropTypes.number,
    container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    disableEscapeKeyDown: PropTypes.bool,
    disablePortal: PropTypes.bool,
    disableRestoreFocus: PropTypes.bool,
    duration: PropTypes.number.isRequired,
    inputRange: PropTypes.array,
    lockScroll: PropTypes.bool,
    onClose: PropTypes.func,
    onEscapeKeyDown: PropTypes.func,
    onRendered: PropTypes.func,
    open: PropTypes.bool.isRequired,
    openDuration: PropTypes.number,
    showUndersheet: PropTypes.bool,
    undersheet: PropTypes.any
  };

  static defaultProps = {
    animated: false,
    disableEscapeKeyDown: false,
    disablePortal: false,
    disableRestoreFocus: false,
    duration: 320,
    inputRange: [0, 1],
    lockScroll: true,
    showUndersheet: true,
    undersheet: Undersheet
  };

  constructor(props) {
    super(props);
    this.animatedValue = props.hasOwnProperty("animatedValue")
      ? this.props.animatedValue
      : this._anim; // eslint-disable-line no-prototype-builtins
    this.state = {
      exited: !props.open
    };
  }

  componentDidMount() {
    if (this.props.open) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    if (this.props.open || !this.state.exited) {
      this.handleClose();
    }
  }

  handleOpen = () => {
    const { animated, duration, openDuration } = this.props;
    document.addEventListener("keydown", this.handleDocumentKeyDown);

    if (animated) {
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: openDuration || duration,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1)
      }).start(() => this.handleOpened());
    } else {
      this.animatedValue.setValue(1);
      this.handleOpened();
    }
  };

  handleRendered = () => {
    if (this.props.onRendered) {
      this.props.onRendered();
    }
  };

  handleOpened = () => {
    const { onOpen } = this.props;
    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (this.modalRef) {
      this.modalRef.scrollTop = 0;
    }
    if (onOpen) {
      onOpen();
    }
  };

  handleClose = () => {
    const { animated, closeDuration, duration } = this.props;

    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    if (animated) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        overshootClamping: true,
        duration: closeDuration || duration,
        easing: Easing.bezier(0.4, 0.0, 1, 1)
      }).start(() => this.handleExited());
    } else {
      this.animatedValue.setValue(0);
      this.handleExited();
    }
  };

  handleExited = () => {
    this.setState({ exited: true });
  };

  handleUndersheetClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    if (this.props.onClose) {
      this.props.onClose(e);
    }
  };

  handleDocumentKeyDown = e => {
    // Ignore events that have been `e.preventDefault()` marked.
    if (keycode(e) !== "esc" || e.defaultPrevented) {
      return;
    }

    if (this.props.onEscapeKeyDown) {
      this.props.onEscapeKeyDown(e);
    }

    if (!this.props.disableEscapeKeyDown && this.props.onClose) {
      this.props.onClose(e);
    }
  };

  handlePortalRef = ref => {
    this.mountNode = ref ? ref.getMountNode() : ref;
  };

  handleModalRef = ref => {
    this.modalRef = ref;
  };

  onRootRef = ref => {
    this.dialogRef = ref;
  };

  get defaultUndersheetAnim() {
    const { inputRange } = this.props;
    return {
      opacity: this.animatedValue.interpolate({
        inputRange,
        outputRange: [0, 1]
      })
    };
  }

  render() {
    const {
      children,
      container,
      disablePortal,
      lockScroll,
      showUndersheet,
      undersheet: UndersheetComponent,
      undersheetStyle,
      open,
      onClose,
      ...other
    } = this.props;

    const { exited } = this.state;

    return (
      <Portal
        ref={this.handlePortalRef}
        container={container}
        disablePortal={disablePortal}
        unmount={exited}
        onRendered={this.handleRendered}
      >
        <ModalRoot isHidden={exited} ref={this.handleModalRef} {...other}>
          <UndersheetComponent
            pointerEvents={open ? "auto" : "none"}
            show={showUndersheet}
            open={!exited}
            style={undersheetStyle || this.defaultUndersheetAnim}
            onClick={open ? this.handleUndersheetClick : undefined}
          />
          <GetRef rootRef={this.onRootRef}>
            {!exited ? cloneElement(children, { onClose }) : null}
          </GetRef>
          <ScrollLock isActive={!exited && lockScroll} />
        </ModalRoot>
      </Portal>
    );
  }
}

export default Modal;

import React, { cloneElement, Component } from "react";
import { withTheme } from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import Easing from "animated/lib/Easing";
import styled from "styled-components";

// Components //
const PageWrapper = styled(Animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  will-change: transform;
  backface-visibility: hidden;
  background-color: ${({ theme }) => theme.color.surface};
`;

const Overlay = styled(Animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
  background-color: ${({ theme }) =>
    theme.colorUtils.fade(theme.color.black, 0.64)};
`;

class LeadTransition extends Component {
  state = {
    animating: false,
    previousLocation: this.props.location,
    previousChild: null
  };

  componentDidMount() {
    const { anim, atParent } = this.props;
    if (atParent) {
      anim.setValue(0);
    } else if (!atParent) {
      anim.setValue(1);
    }
  }

  async componentWillReceiveProps(nextProps, nextState) {
    const { anim, atParent, theme } = this.props;
    // figure out what to do with the children
    const navigatingToParent = nextProps.atParent && !atParent;
    const navigatingToChild = !nextProps.atParent && atParent;
    const navigatingPastChild = !nextProps.atParent && !atParent;
    if (navigatingToParent) {
      await this.setState(
        {
          animating: true,
          previousChild: this.props.children,
          previousLocation: this.props.location
        },
        () => {
          Animated.timing(anim, {
            toValue: 0,
            duration: 480,
            easing: Easing.bezier(...theme.easing.standard)
          }).start(async () => {
            this.setState({
              animating: false,
              previousChild: null
            });
          });
        }
      );
    } else if (navigatingToChild || navigatingPastChild) {
      this.setState(
        {
          animating: true,
          previousChild: this.props.children,
          previousLocation: this.props.location
        },
        () => {
          Animated.timing(anim, {
            toValue: 1,
            duration: 480,
            easing: Easing.bezier(...theme.easing.standard)
          }).start(async () => {
            this.setState({
              animating: false,
              previousChild: null
            });
          });
        }
      );
    }
  }

  get parentStyle() {
    const { anim } = this.props;
    return {
      transform: [
        {
          translateX: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -48]
          })
        }
      ],
      zIndex: 0
    };
  }

  get childStyle() {
    const { anim } = this.props;
    return {
      transform: [
        {
          translateX: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ["100%", "0%"]
          })
        }
      ],
      zIndex: 2
    };
  }

  get overlayStyle() {
    const { anim } = this.props;
    return {
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.64]
      })
    };
  }

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (Page, index) => {
      const style = this.getStyle(index);
      return <PageWrapper style={style}>{cloneElement(Page)}</PageWrapper>;
    });
  };

  render() {
    const { atParent, children } = this.props;
    const { animating, previousChild } = this.state;
    return (
      <>
        {animating || atParent ? (
          <PageWrapper style={this.parentStyle}>
            {!atParent && !animating
              ? null
              : atParent && animating
                ? children
                : previousChild || children}
          </PageWrapper>
        ) : null}
        <Overlay style={this.overlayStyle} />
        <PageWrapper style={this.childStyle}>
          {atParent && animating
            ? previousChild
            : atParent && !animating
              ? null
              : children}
        </PageWrapper>
      </>
    );
  }
}

export default withTheme(LeadTransition);

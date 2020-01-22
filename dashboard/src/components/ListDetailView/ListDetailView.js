import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import { Switch } from "react-router-dom";

// Components //
import ListDetailTransition from "./ListDetailTransition";

const Root = styled.div`
  flex: 1;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
`;

class ListDetailView extends Component {
  transitionAnim = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.mediaQuery = window.matchMedia(
      `(min-width: ${props.theme.breakpoints.sm}px)`
    );

    this.state = {
      animating: false,
      useStack: !this.mediaQuery.matches
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.animating) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.mediaQuery.addListener(this.handleChange);
  }

  componentWillUnmount() {
    this.mediaQuery.removeListener(this.handleChange);
  }

  setAnimating = async animating => {
    await this.setState({
      animating
    });
  };

  handleChange = ({ matches }) => {
    this.setState({
      useStack: !matches
    });
  };

  render() {
    const { children, rootAs, location, match } = this.props;
    const { animating, useStack } = this.state;
    if (useStack) {
      return (
        <Root as={rootAs}>
          <ListDetailTransition
            location={location}
            animating={animating}
            setAnimating={this.setAnimating}
            anim={this.transitionAnim}
            atParent={match.isExact}
          >
            <Switch location={location}>{children}</Switch>
          </ListDetailTransition>
        </Root>
      );
    }
    return <Root as={rootAs}>{children}</Root>;
  }
}

export default withTheme(ListDetailView);

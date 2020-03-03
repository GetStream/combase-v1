import React, { Component } from "react";
import PropTypes from "prop-types";
import Animated from "animated/lib/targets/react-dom";

import LayoutUtil from "./LayoutUtil";

// Components //
import ListView from "components/ListView";
import Message from "./Message";

class MessagesList extends Component {
  static propTypes = {
    data: PropTypes.array,
    partner: PropTypes.object,
    onEndReached: PropTypes.func,
    setMessageContainerRef: PropTypes.func,
    scrollAnim: PropTypes.instanceOf(Animated.Value),
    user: PropTypes.object
  };

  static defaultProps = {
    scrollAnim: new Animated.Value(0)
  };

  state = {
    layoutProvider: LayoutUtil.getLayoutProvider(
      0,
      this.props.data,
      this.props.user
    ),
    layout: {}
  };

  componentDidUpdate(prevProps, prevState) {
    const { layout } = this.state;
    const { data, user } = this.props;
    if (
      layout.width !== prevState.layout.width ||
      data.length !== prevProps.data.length
    ) {
      this.setState({
        layoutProvider: LayoutUtil.getLayoutProvider(layout.width, data, user)
      });
    }
  }

  onResize = layout => this.setState({ layout });

  renderRow = (currentMessage, index) => {
    const {
      layout: { width }
    } = this.state;
    if (!currentMessage) {
      return null;
    }
    if (!currentMessage.user && !currentMessage.system) {
      if (!currentMessage.system) {
        console.warn("`user` is missing from message.");
      }
      currentMessage.user = { id: 0 };
    }

    const { data, user, partner, read, ...rest } = this.props;

    if (data && user) {
      const previousMessage = data[index + 1];
      const nextMessage = data[index - 1];
      const isOwn = currentMessage.user && currentMessage.user.id === user._id;
      const messageProps = {
        ...rest,
        user,
        partner,
        key: currentMessage.id,
        currentMessage,
        previousMessage,
        nextMessage,
        isRead: read.last_read >= currentMessage.created_at,
        position: isOwn ? "right" : "left"
      };
      return <Message {...{ width }} {...messageProps} />;
    }

    return null;
  };

  get style() {
    return {
      flex: 1,
      transform: "scaleY(-1)"
    };
  }

  render() {
    const {
      data,
      extendedState = {},
      onEndReached,
      scrollAnim,
      setMessageContainerRef,
      read
    } = this.props;
    const { layoutProvider } = this.state;
    const { onResize, renderRow, style } = this;
    return (
      <ListView
        {...{
          data,
          layoutProvider,
          renderRow,
          onResize,
          scrollAnim,
          setMessageContainerRef,
          style
        }}
        extendedState={{ data, read, ...extendedState }}
        forceNonDeterministicRendering
        onEndReached={onEndReached}
        onEndReachedThreshold={240}
        rowCount={data.length}
      />
    );
  }
}

export default MessagesList;

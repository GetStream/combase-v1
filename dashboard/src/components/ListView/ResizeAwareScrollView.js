import React, { Component } from "react";
import styled from "styled-components";
import ScrollViewer from "recyclerlistview/dist/reactnative/platform/web/scrollcomponent/ScrollViewer";
import { ResizeObserver } from "@juggle/resize-observer";

// Components //
const Root = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

class ExternalScrollView extends Component {
  observer = null;
  root = React.createRef();

  componentDidMount() {
    this.observer = new ResizeObserver(this.handleResize);
    this.observer.observe(this.root.current);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  handleResize = entries => {
    const { onResize } = this.props;

    const [entry] = entries;
    const { width, height } = entry.contentRect; // use for backwards compatibility
    this.props.onSizeChanged({
      width,
      height
    });

    if (onResize) {
      onResize(width, height);
    }
  };

  scrollTo(arg) {
    this.refs.scrollView.scrollTo(arg);
  }

  render() {
    const { children, ListHeaderComponent, ...rest } = this.props;

    return (
      <Root ref={this.root}>
        <ScrollViewer ref="scrollView" {...rest}>
          {ListHeaderComponent && <ListHeaderComponent />}
          {children}
        </ScrollViewer>
      </Root>
    );
  }
}

export default ExternalScrollView;

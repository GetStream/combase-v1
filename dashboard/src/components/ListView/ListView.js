import React, { Component } from "react";
import PropTypes from "prop-types";
import Animated from "animated/lib/targets/react-dom";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView
} from "recyclerlistview/web";

// Components //
import ResizeAwareScrollView from "./ResizeAwareScrollView";

class ListView extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    emptyButtonLabel: PropTypes.string,
    emptyIcon: PropTypes.func,
    emptyIconSize: PropTypes.number,
    emptyText: PropTypes.string,
    layoutProvider: PropTypes.instanceOf(LayoutProvider).isRequired,
    renderRow: PropTypes.func,
    rowCount: PropTypes.number.isRequired,
    scrollAnim: PropTypes.instanceOf(Animated.Value),
    showEmptyHeader: PropTypes.bool,
    showSidebar: PropTypes.bool
  };

  static defaultProps = {
    scrollAnim: new Animated.Value(0)
  };

  constructor(props) {
    super(props);

    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.state = {
      width: 0,
      height: 0,
      dataProvider: dataProvider.cloneWithRows(
        this.generateArray(props.rowCount)
      )
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { rowCount } = this.props;
    const { dataProvider } = this.state;

    if (prevProps.rowCount !== rowCount) {
      this.setState({
        dataProvider: dataProvider.cloneWithRows(this.generateArray(rowCount))
      });
    }
  }

  handleResize = async (width, height) => {
    const { onResize } = this.props;
    await this.setState({
      width,
      height
    });
    if (onResize) {
      onResize({ width, height });
    }
  };

  handleScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: this.props.scrollAnim } } }
  ]);

  generateArray(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  }

  getItemData = index => {
    const { data } = this.props;
    return data[index];
  };

  renderRow = (type, row) => {
    const data = this.getItemData(row);
    return this.props.renderRow(data, row);
  };

  render() {
    const {
      contentContainerStyle,
      extendedState,
      externalScrollView = ResizeAwareScrollView,
      data,
      distanceFromWindow,
      layoutProvider,
      ListEmptyComponent,
      ListHeaderComponent,
      renderAheadOffset,
      rowCount,
      scrollAnim,
      showEmptyHeader,
      style
    } = this.props;

    const { dataProvider } = this.state;

    if (rowCount === 0) {
      return (
        <>
          {showEmptyHeader ? <ListHeaderComponent /> : null}
          {ListEmptyComponent ? <ListEmptyComponent /> : null}
        </>
      );
    }

    return (
      <RecyclerListView
        canChangeSize
        {...{
          contentContainerStyle,
          dataProvider,
          distanceFromWindow,
          extendedState,
          externalScrollView,
          layoutProvider,
          ListHeaderComponent,
          renderAheadOffset,
          scrollAnim,
          style
        }}
        onScroll={this.handleScroll}
        extraData={data}
        rowRenderer={this.renderRow}
        onResize={this.handleResize}
      />
    );
  }
}

export default ListView;

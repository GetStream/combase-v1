import React, { Component } from "react";
import PropTypes from "prop-types";
import Animated from "animated/lib/targets/react-dom";
import Easing from "animated/lib/Easing";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView
} from "recyclerlistview/web";

// Components //
import ResizeAwareScrollView from "./ResizeAwareScrollView";

const NOOP = () => null;

// TODO: Fix the below animator
// const layoutItemAnimator = {
//   animateWillMount: () => ({ opacity: 0, transform: { translateX: 8 } }),
//   animateDidMount: (atX, atY, itemRef, itemIndex) => {
//     itemRef.style.opacity = 0;
//     itemRef.style.top = "8px";
//     const anim = new Animated.Value(0);
//     const top = anim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ["8px", "0px"]
//     });

//     const style = {};

//     anim.addListener(({ value }) => {
//       itemRef.style.opacity = value;
//       itemRef.style.top = top.__getValue();
//     });

//     Animated.timing(anim, {
//       toValue: 1,
//       duration: 2000,
//       delay: itemIndex * 50,
//       easing: Easing.out(Easing.cubic)
//     }).start();
//   },
//   animateShift: NOOP,
//   animateWillUnmount: NOOP,
//   animateWillUpdate: NOOP
// };
const layoutItemAnimator = null;

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
    showEmptyHeader: PropTypes.bool,
    showSidebar: PropTypes.bool
  };

  constructor(props) {
    super(props);

    let dataProvider = new DataProvider((r1, r2) => {
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
      layoutProvider,
      ListHeaderComponent,
      renderAheadOffset,
      rowCount,
      showEmptyHeader,
      style
    } = this.props;

    const { dataProvider } = this.state;

    if (rowCount === 0) {
      return (
        <>
          {showEmptyHeader && <ListHeaderComponent />}
          <p>Empty</p>
        </>
      );
    }

    return (
      <RecyclerListView
        // useWindowScroll={true}
        canChangeSize
        extendedState={extendedState}
        externalScrollView={externalScrollView}
        contentContainerStyle={contentContainerStyle}
        dataProvider={dataProvider}
        extraData={data}
        itemAnimator={layoutItemAnimator}
        layoutProvider={layoutProvider}
        ListHeaderComponent={ListHeaderComponent}
        renderAheadOffset={renderAheadOffset}
        rowRenderer={this.renderRow}
        onResize={this.handleResize}
        style={style}
      />
    );
  }
}

export default ListView;

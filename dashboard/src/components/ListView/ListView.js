import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import Animated from 'animated/lib/targets/react-dom';
import {
    DataProvider,
    LayoutProvider,
    RecyclerListView,
    BaseItemAnimator,
} from 'recyclerlistview/web';

// Components //
import LoadingState from 'shared/LoadingState';
import ResizeAwareScrollView from './ResizeAwareScrollView';

const itemAnimator = new BaseItemAnimator();

class ListView extends Component {
    static propTypes = {
        contextProvider: PropTypes.any,
        data: PropTypes.array.isRequired,
        emptyButtonLabel: PropTypes.string,
        emptyIcon: PropTypes.func,
        emptyIconSize: PropTypes.number,
        emptyText: PropTypes.string,
        immutable: PropTypes.bool,
        layoutProvider: PropTypes.instanceOf(LayoutProvider).isRequired,
        loading: PropTypes.bool,
        renderRow: PropTypes.func,
        rowCount: PropTypes.number.isRequired,
        scrollAnim: PropTypes.instanceOf(Animated.Value),
        showEmptyHeader: PropTypes.bool,
        showSidebar: PropTypes.bool,
    };

    static defaultProps = {
        scrollAnim: new Animated.Value(0),
    };

    list = createRef();

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
            ),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { rowCount } = this.props;
        const { dataProvider } = this.state;

        if (prevProps.rowCount !== rowCount) {
            this.setState({
                dataProvider: dataProvider.cloneWithRows(
                    this.generateArray(rowCount)
                ),
            });
        }
    }

    handleResize = async (width, height) => {
        const { onResize } = this.props;
        await this.setState({
            width,
            height,
        });
        if (onResize) {
            onResize({ width, height });
        }
    };

    handleScroll = Animated.event([
        { nativeEvent: { contentOffset: { y: this.props.scrollAnim } } },
    ]);

    generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = i;
        }
        return arr;
    }

    getItemData = index => {
        const { data, immutable } = this.props;
        if (immutable) {
            return data.getIn([index]);
        }
        return data[index];
    };

    renderRow = (type, row) => {
        const data = this.getItemData(row);
        return this.props.renderRow(data, row);
    };

    render() {
        const {
            contentContainerStyle,
            contextProvider,
            externalScrollView = ResizeAwareScrollView,
            data,
            distanceFromWindow,
            extendedState,
            forceNonDeterministicRendering,
            initialRenderIndex,
            initialOffset,
            layoutProvider,
            loading,
            ListEmptyComponent,
            ListHeaderComponent,
            ListLoadingComponent,
            onEndReached,
            onEndReachedThreshold,
            renderAheadOffset,
            rowCount,
            scrollAnim,
            setMessageContainerRef,
            showEmptyHeader,
            style,
        } = this.props;

        const { dataProvider } = this.state;

        if (loading) {
            return (
                <>
                    {showEmptyHeader ? <ListHeaderComponent /> : null}
                    {ListLoadingComponent ? <ListLoadingComponent /> : <LoadingState />}
                </>
            )
        }

        if (!data || rowCount === 0) {
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
                ref={setMessageContainerRef}
                {...{
                    contentContainerStyle,
                    contextProvider,
                    dataProvider,
                    distanceFromWindow,
                    externalScrollView,
                    forceNonDeterministicRendering,
                    initialRenderIndex,
                    initialOffset,
                    itemAnimator,
                    layoutProvider,
                    ListHeaderComponent,
                    onEndReached,
                    onEndReachedThreshold,
                    renderAheadOffset,
                    scrollAnim,
                    style,
                }}
                onScroll={this.handleScroll}
                extendedState={extendedState || { data }}
                rowRenderer={this.renderRow}
                onResize={this.handleResize}
            />
        );
    }
}

export default ListView;

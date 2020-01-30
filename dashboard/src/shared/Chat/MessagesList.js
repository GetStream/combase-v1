import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import isEqual from 'lodash.isequal';

import LayoutUtil from './LayoutUtil';

// Components //
import ListView from 'components/ListView';
import Message from './Message';

class MessagesList extends Component {
    scrollAnim = new Animated.Value(0);

    state = {
        layoutProvider: LayoutUtil.getLayoutProvider(
            0,
            this.props.data,
            this.props.user
        ),
        layout: {},
    };

    componentDidUpdate(prevProps, prevState) {
        const { layout } = this.state;
        const { data, user } = this.props;
        if (
            layout.width !== prevState.layout.width ||
            data.length !== prevProps.data.length
        ) {
            this.setState({
                layoutProvider: LayoutUtil.getLayoutProvider(
                    layout.width,
                    data,
                    user
                ),
            });
        }
    }

    handleEndReached = () => {
        console.log('end reached load more');
    };

    onResize = layout => this.setState({ layout });

    renderRow = (currentMessage, index) => {
        const {
            layout: { width },
        } = this.state;
        if (!currentMessage.user && !currentMessage.system) {
            if (!currentMessage.system) {
                console.warn('`user` is missing from message.');
            }
            currentMessage.user = { id: 0 };
        }

        const { data, user, ...rest } = this.props;

        if (data && user) {
            const previousMessage = data[index + 1];
            const nextMessage = data[index - 1];
            const isOwn =
                currentMessage.user && currentMessage.user.id === user.id;
            const messageProps = {
                ...rest,
                user,
                key: currentMessage.id,
                currentMessage,
                previousMessage,
                nextMessage,
                position: isOwn ? 'right' : 'left',
            };
            return <Message {...{ width }} {...messageProps} />;
        }

        return null;
    };

    get style() {
        return {
            flex: 1,
            transform: 'scaleY(-1)',
        };
    }

    render() {
        const { data, inputToolbarHeight, setMessageContainerRef } = this.props;
        const { layoutProvider } = this.state;
        const { onResize, renderRow, scrollAnim, style } = this;
        return (
            <ListView
                {...{
                    data,
                    inputToolbarHeight,
                    layoutProvider,
                    renderRow,
                    onResize,
                    scrollAnim,
                    setMessageContainerRef,
                    style,
                }}
                forceNonDeterministicRendering
                onEndReached={this.handleEndReached}
                onEndReachedThreshold={240}
                rowCount={data.length}
            />
        );
    }
}

export default MessagesList;

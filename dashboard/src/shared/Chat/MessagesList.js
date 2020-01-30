import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';

import LayoutUtil from './LayoutUtil';

// Components //
import ListView from 'components/ListView';
import Message from './Message';

class MessagesList extends Component {
    scrollAnim = new Animated.Value(0);

    state = {
        layoutProvider: LayoutUtil.getLayoutProvider(0),
        layout: {},
    };

    componentDidUpdate(prevProps, prevState) {
        const { layout } = this.state;
        if (layout.width !== prevState.layout.width) {
            this.setState({
                layoutProvider: LayoutUtil.getLayoutProvider(layout.width),
            });
        }
    }

    handleEndReached = () => {
        console.log('end reached', 'load more');
    };

    onResize = layout => this.setState({ layout });

    renderRow = (currentMessage, index) => {
        if (!currentMessage.user && !currentMessage.system) {
            if (!currentMessage.system) {
                console.warn('`user` is missing from message.');
            }
            currentMessage.user = { id: 0 };
        }

        const { data, user, ...rest } = this.props;

        if (data && user) {
            const previousMessage = data[index - 1];
            const nextMessage = data[index + 1];
            const isOwn = currentMessage.user.id === user.id;
            const messageProps = {
                ...rest,
                user,
                key: currentMessage.id,
                currentMessage,
                previousMessage,
                nextMessage,
                position: isOwn ? 'right' : 'left',
            };
            return <Message {...messageProps} />;
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
                onEndReached={this.handleEndReached}
                onEndReachedThreshold={240}
                rowCount={data.length}
            />
        );
    }
}

export default MessagesList;

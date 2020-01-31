import React, { Component } from 'react';
import ResizeObserver from 'utils/ResizeObserver';

const defaultOptions = {
    box: 'border-box',
};

export default (WrappedComponent, observerOptions = defaultOptions) => {
    return class withResize extends Component {
        ref = React.createRef();

        state = {
            layout: {},
        };

        componentDidMount() {
            this.observer = new ResizeObserver(this.handleResize);
            this.observer.observe(this.ref.current, observerOptions);
        }

        componentWillUnmount() {
            this.observer.disconnect();
        }

        handleResize = entries => {
            const { onResize } = this.props;

            const [entry] = entries;

            const {
                inlineSize: width,
                blockSize: height,
            } = entry.borderBoxSize[0]; // use for backwards compatibility
            this.setState({
                layout: { width, height },
            });

            if (onResize) {
                onResize({ width, height });
            }
        };
        render() {
            const { layout } = this.state;
            return (
                <WrappedComponent
                    {...this.props}
                    setRef={this.ref}
                    {...{ layout }}
                />
            );
        }
    };
};

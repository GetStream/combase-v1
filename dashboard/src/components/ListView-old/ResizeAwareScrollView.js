import React, { Component } from 'react';
import styled from 'styled-components';
import ScrollViewer from 'recyclerlistview/dist/reactnative/platform/web/scrollcomponent/ScrollViewer';
import ResizeObserver from 'utils/ResizeObserver';

// Components //
const Root = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

class ExternalScrollView extends Component {
    observer = null;
    root = React.createRef();
    scrollView = React.createRef();

    componentDidMount() {
        const { clientWidth, clientHeight } = this.root.current;
        this.updateDimensions(clientWidth, clientHeight);
        this.initResizeObservation();
    }

    initResizeObservation = () => {
        this.observer = new ResizeObserver(this.handleResize);
        this.observer.observe(this.root.current);
    };

    componentWillUnmount() {
        this.observer.disconnect();
    }

    handleResize = entries => {
        const [entry] = entries;
        const { width, height } = entry.contentRect; // use for backwards compatibility
        this.updateDimensions(width, height);
    };

    updateDimensions = (width, height) => {
        const { onSizeChanged, onResize } = this.props;
        onSizeChanged({
            width,
            height,
        });

        if (onResize) {
            onResize(width, height);
        }
    };

    scrollTo(arg) {
        this.scrollView.current.scrollTo(arg);
    }

    render() {
        const {
            children,
            ListHeaderComponent,
            scrollAnim,
            ...rest
        } = this.props;
        return (
            <Root ref={this.root}>
                <ScrollViewer ref={this.scrollView} {...rest}>
                    {ListHeaderComponent && (
                        <ListHeaderComponent {...{ scrollAnim }} />
                    )}
                    {children}
                </ScrollViewer>
            </Root>
        );
    }
}

export default ExternalScrollView;

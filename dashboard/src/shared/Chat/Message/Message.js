import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isSameSection, checkHasNext, checkHasPrev } from '../utils';

// Messages //
import Day from '../Day';
import UserMessage from './UserMessage';
import PartnerMessage from './PartnerMessage';
import SystemMessage from './SystemMessage';

const Wrapper = styled.div`
    margin-bottom: ${({ hasPrev }) => (!hasPrev ? 24 : 0)}px;
    width: ${({ width }) => `${width}px` || '100%'};
    transform: scaleY(-1);
`;

class Message extends Component {
    static propTypes = {
        isRead: PropTypes.bool,
        DayComponent: PropTypes.any,
        UserMessageComponent: PropTypes.any,
        PartnerMessageComponent: PropTypes.any,
        SystemMessageComponent: PropTypes.any,
        width: PropTypes.number,
    };

    static defaultProps = {
        DayComponent: Day,
        UserMessageComponent: UserMessage,
        PartnerMessageComponent: PartnerMessage,
        SystemMessageComponent: SystemMessage,
    };

    get hasNext() {
        const { currentMessage, nextMessage, position } = this.props;
        return checkHasNext(currentMessage, nextMessage, position);
    }

    get hasPrev() {
        const { currentMessage, previousMessage, position } = this.props;
        return checkHasPrev(currentMessage, previousMessage, position);
    }

    get isOwn() {
        const { currentMessage, user } = this.props;
        return currentMessage.user.id === user.id;
    }

    shouldComponentUpdate(nextProps) {
        const next = nextProps.currentMessage;
        const current = this.props.currentMessage;
        const { isRead, previousMessage, nextMessage, width } = this.props;
        const nextPropsMessage = nextProps.nextMessage;
        const nextPropsPreviousMessage = nextProps.previousMessage;

        const shouldUpdate =
            (this.props.shouldUpdateMessage &&
                this.props.shouldUpdateMessage(this.props, nextProps)) ||
            false;

        return (
            (!isRead && nextProps.isRead) ||
            width !== nextProps.width ||
            next.sent !== current.sent ||
            next.received !== current.received ||
            next.pending !== current.pending ||
            next.created_at !== current.created_at ||
            next.text !== current.text ||
            next.image !== current.image ||
            next.video !== current.video ||
            next.audio !== current.audio ||
            previousMessage !== nextPropsPreviousMessage ||
            nextMessage !== nextPropsMessage ||
            shouldUpdate
        );
    }

    renderDay = () => {
        const { currentMessage, DayComponent, previousMessage } = this.props;

        if (
            currentMessage &&
            currentMessage.created_at &&
            !isSameSection(currentMessage, previousMessage)
        ) {
            return <DayComponent date={currentMessage.created_at} />;
        }
    };

    render() {
        const {
            isRead,
            UserMessageComponent,
            PartnerMessageComponent,
            SystemMessageComponent,
            width,
            ...rest
        } = this.props;

        const { hasNext, hasPrev } = this;

        const {
            currentMessage: { system: isSystemMessage },
        } = this.props;

        if (isSystemMessage) {
            return (
                <Wrapper {...{ width }}>
                    <SystemMessageComponent {...rest} />
                </Wrapper>
            );
        }

        const MessageComponent = !this.isOwn
            ? PartnerMessageComponent
            : UserMessageComponent;

        return (
            <Wrapper {...{ hasPrev, width }}>
                {this.renderDay()}
                <MessageComponent {...{ isRead, hasNext, hasPrev }} {...rest} />
            </Wrapper>
        );
    }
}

export default Message;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { isSameUser } from '../utils';

// Messages //
import Day from '../Day';
import UserMessage from './UserMessage';
import PartnerMessage from './PartnerMessage';
import SystemMessage from './SystemMessage';

const Wrapper = styled.div`
    max-width: 840px;
    width: 100%;
    align-self: center;
`;

const Root = styled.div`
    flex-direction: row;
    align-items: flex-end;
    justify-content: ${({ pos }) =>
        pos === 'left' ? 'flex-end' : 'flex-start'};
    margin-top: ${({ isFirst }) => (isFirst ? 32 : 0)}px;
    margin-right: ${({ pos, theme }) => (pos === 'left' ? 0 : 8)}px;
    margin-left: ${({ pos, theme }) => (pos === 'left' ? 8 : 0)}px;
    margin-bottom: ${({ hasNext, theme }) => (hasNext ? 2 : 24)}px;
`;

class Message extends Component {
    static propTypes = {
        DayComponent: PropTypes.any,
        UserMessageComponent: PropTypes.any,
        PartnerMessageComponent: PropTypes.any,
        SystemMessageComponent: PropTypes.any,
    };

    static defaultProps = {
        DayComponent: Day,
        UserMessageComponent: UserMessage,
        PartnerMessageComponent: PartnerMessage,
        SystemMessageComponent: SystemMessage,
    };

    get hasNext() {
        const { currentMessage, nextMessage, position } = this.props;
        return (
            currentMessage &&
            nextMessage &&
            nextMessage.id &&
            position &&
            isSameUser(currentMessage, nextMessage) &&
            !moment(currentMessage.created_at).isBefore(
                moment(nextMessage.created_at).subtract(20, 'minutes')
            )
        );
    }

    get hasPrev() {
        const { currentMessage, previousMessage, position } = this.props;
        return (
            currentMessage &&
            previousMessage &&
            previousMessage.id &&
            position &&
            isSameUser(currentMessage, previousMessage) &&
            !moment(currentMessage.created_at).isAfter(
                moment(previousMessage.created_at).add(20, 'minutes')
            )
        );
    }

    get isOwn() {
        const { currentMessage, user } = this.props;
        return currentMessage.user.id === user.id;
    }

    isSameSection = (currentMessage, previousMessage) => {
        if (!previousMessage.created_at) {
            return true;
        }
        return (
            (isSameUser(currentMessage, previousMessage) &&
                !moment(currentMessage.created_at).isAfter(
                    moment(previousMessage.created_at).add(20, 'minutes')
                )) ||
            !moment(currentMessage.created_at).isAfter(
                moment(previousMessage.created_at).add(20, 'minutes')
            )
        );
    };

    shouldComponentUpdate(nextProps) {
        const next = nextProps.currentMessage;
        const current = this.props.currentMessage;
        const { previousMessage, nextMessage } = this.props;
        const nextPropsMessage = nextProps.nextMessage;
        const nextPropsPreviousMessage = nextProps.previousMessage;

        const shouldUpdate =
            (this.props.shouldUpdateMessage &&
                this.props.shouldUpdateMessage(this.props, nextProps)) ||
            false;

        return (
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
        const {
            currentMessage,
            DayComponent,
            previousMessage,
            renderDay,
        } = this.props;

        if (
            currentMessage &&
            currentMessage.created_at &&
            !this.isSameSection(currentMessage, previousMessage)
        ) {
            return <DayComponent date={currentMessage.created_at} />;
        }
    };

    render() {
        const {
            UserMessageComponent,
            PartnerMessageComponent,
            SystemMessageComponent,
            ...rest
        } = this.props;

        const {
            currentMessage: { system: isSystemMessage },
        } = this.props;

        if (isSystemMessage) {
            return <SystemMessageComponent {...rest} />;
        }

        const MessageComponent = !this.isOwn
            ? PartnerMessageComponent
            : UserMessageComponent;

        return (
            <Wrapper>
                {this.renderDay()}
                <Root>
                    <MessageComponent {...rest} />
                </Root>
            </Wrapper>
        );
    }
}

export default Message;

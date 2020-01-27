import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import moment from 'moment';
import { utils } from 'react-web-gifted-chat';

// Components //
import Avatar from 'shared/Avatar';
import Bubble from './Bubble';
import Day from './Day';

const Container = styled(View)`
    max-width: 608px;
    width: 100%;
    align-self: center;
`;

const Root = styled(View)`
    flex-direction: row;
    align-items: flex-end;
    justify-content: ${({ pos }) => (pos === 'left' ? 'flex-end' : 'flex-start')};
    margin-top: ${({ isFirst }) => (isFirst ? 32 : 0)}px;
    margin-right: ${({ pos, theme }) => (pos === 'left' ? 0 : 8)}px;
    margin-left: ${({ pos, theme }) => (pos === 'left' ? 8 : 0)}px;
    margin-bottom: ${({ hasNext, theme }) => (hasNext ? 2 : 24)}px;
`;

const AvatarWrapper = styled(View)`
    margin-left: ${({ pos, theme }) => (pos === 'right' ? 8 : 0)}px;
    margin-right: ${({ pos, theme }) => (pos === 'left' ? 8 : 0)}px;
`;

// TODO:
// Accordion on tap to show delivered status. (See Android Messages app.)

const { isSameUser, isSameDay } = utils;
class Message extends Component {
    shouldComponentUpdate(nextProps) {
        const next = nextProps.currentMessage;
        const current = this.props.currentMessage;
        const { previousMessage, nextMessage } = this.props;
        const nextPropsMessage = nextProps.nextMessage;
        const nextPropsPreviousMessage = nextProps.previousMessage;

        const shouldUpdate =
            (this.props.shouldUpdateMessage && this.props.shouldUpdateMessage(this.props, nextProps)) || false;

        return (
            next.sent !== current.sent ||
            next.received !== current.received ||
            next.pending !== current.pending ||
            next.createdAt !== current.createdAt ||
            next.text !== current.text ||
            next.image !== current.image ||
            next.video !== current.video ||
            next.audio !== current.audio ||
            previousMessage !== nextPropsPreviousMessage ||
            nextMessage !== nextPropsMessage ||
            shouldUpdate
        );
    }

    get hasNext() {
        const { currentMessage, nextMessage, position } = this.props;
        return (
            currentMessage &&
            nextMessage &&
            nextMessage._id &&
            position &&
            isSameUser(currentMessage, nextMessage) &&
            !moment(currentMessage.createdAt).isBefore(moment(nextMessage.createdAt).subtract(20, 'minutes'))
        );
    }

    get hasPrev() {
        const { currentMessage, previousMessage, position } = this.props;
        return (
            currentMessage &&
            previousMessage &&
            previousMessage._id &&
            position &&
            isSameUser(currentMessage, previousMessage) &&
            !moment(currentMessage.createdAt).isAfter(moment(previousMessage.createdAt).add(20, 'minutes'))
        );
    }

    isSameSection = (currentMessage, previousMessage) => {
        if (!previousMessage.createdAt) {
            return true;
        }
        return (
            (isSameUser(currentMessage, previousMessage) &&
                !moment(currentMessage.createdAt).isAfter(moment(previousMessage.createdAt).add(20, 'minutes'))) ||
            !moment(currentMessage.createdAt).isAfter(moment(previousMessage.createdAt).add(20, 'minutes'))
        );
    };

    renderAvatar = () => {
        const { currentMessage, position, showUserAvatar, user, previousMessage } = this.props;
        const isOwn = currentMessage.user._id === user._id;

        if (isOwn && !showUserAvatar) {
            return null;
        }

        if (this.isSameSection(currentMessage, previousMessage) && !this.hasNext) {
            return (
                <AvatarWrapper pos={position}>
                    <Avatar name={currentMessage.user.name} />
                </AvatarWrapper>
            );
        }
    };

    renderBubble = () => {
        const { containerStyle, ...props } = this.props;
        const { hasNext, hasPrev } = this;
        const hasAvatar = !!this.renderAvatar();
        return <Bubble {...props} {...{ hasAvatar, hasNext, hasPrev }} />;
    };

    renderDay = (props) => {
        const { currentMessage, previousMessage } = this.props;

        if (currentMessage && currentMessage.createdAt && !this.isSameSection(currentMessage, previousMessage)) {
            const date = currentMessage.createdAt;
            return <Day {...{ date }} />;
        }
        return null;
    };

    render() {
        const {
            currentMessage: { system: isSystemMessage },
            position,
            renderSystemMessage,
        } = this.props;

        if (isSystemMessage) {
            return renderSystemMessage(this.props);
        }

        return (
            <Container>
                {this.renderDay()}
                <Root hasNext={this.hasNext} pos={position}>
                    {position === 'left' ? this.renderAvatar() : null}
                    {this.renderBubble()}
                    {position === 'right' ? this.renderAvatar() : null}
                </Root>
            </Container>
        );
    }
}

export default Message;

import moment from 'moment';

export const isSameDay = (currentMessage, diffMessage) => {
    if (!diffMessage || !diffMessage.createdAt) {
        return false;
    }

    const currentCreatedAt = moment(currentMessage.createdAt);
    const diffCreatedAt = moment(diffMessage.createdAt);

    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
        return false;
    }

    return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export const isSameUser = (currentMessage, diffMessage) => {
    return !!(
        diffMessage &&
        diffMessage.user &&
        currentMessage.user &&
        diffMessage.user.id === currentMessage.user.id
    );
}

export const append = (currentMessages, messages) => {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }
    return messages.concat(currentMessages);
};


export const checkHasNext = (currentMessage, nextMessage, position) => {
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
};

export const checkHasPrev = (currentMessage, previousMessage, position) => {
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
};

export const isSameSection = (currentMessage, previousMessage) => {
    if (!previousMessage || !previousMessage.created_at) {
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
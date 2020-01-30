import moment from 'moment';

export function isSameDay(currentMessage, diffMessage) {
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

export function isSameUser(currentMessage, diffMessage) {
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

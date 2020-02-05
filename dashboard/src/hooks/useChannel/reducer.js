import { append } from 'shared/Chat';
import sortBy from 'lodash.sortby';

export default (state, { type, ...action }) => {
    // console.log('channel event', action, state);
    switch (type) {
        case 'INIT_STATE':
            return {
                ...state,
                ...action,
                messages: sortBy(
                    action.messages,
                    ({ created_at }) => -created_at
                ),
                loading: false,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.error,
            };

        case 'message.new':
            return {
                ...state,
                messages: sortBy(
                    append(state.messages, [action.message]),
                    ({ created_at }) => -created_at
                ),
            };

        case 'typing.start':
            return {
                ...state,
                typing: { ...state.typing, [action.user.id]: true },
            };
        case 'typing.stop':
            return {
                ...state,
                typing: { ...state.typing, [action.user.id]: false },
            };
        default:
            return state;
    }
};

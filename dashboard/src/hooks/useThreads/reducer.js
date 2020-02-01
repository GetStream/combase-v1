import Immutable from 'seamless-immutable';

export default (state, action) => {
    switch (action.type) {
        case 'SET':
            return state.setIn(['channels'], Immutable(action.channels));
        default:
            return state;
    }
};

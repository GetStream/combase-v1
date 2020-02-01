import {
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import Immutable from 'seamless-immutable';
import ChatContext from 'contexts/Chat';
import AuthContext from 'contexts/Auth';

import reducer from './reducer';

const initialState = Immutable({
    channels: Immutable([]),
    loading: false,
});

export default () => {
    const client = useContext(ChatContext);
    const user = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    // useEffect(() => {
    //     client.
    // }, []);

    const getChannels = useCallback(async () => {
        try {
            const channels = await client.queryChannels();
            dispatch({
                type: 'SET',
                channels: channels.map(({ data }) => data),
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getChannels();
    }, []);
    return [state.getIn(['channels'])];
};

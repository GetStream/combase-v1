import { useContext, useMemo } from 'react';
import ChannelsContext from 'shared/Chat/contexts/Channels';

export default channelId => {
    const [channels] = useContext(ChannelsContext);
    const channel = useMemo(() => {
        return channels.find(({ id }) => id === channelId);
    }, [channels, channelId]);
    return channel;
};

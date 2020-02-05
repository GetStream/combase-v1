export const moveChannelToTop = (currentChannels, channelId) => {
    const channels = [...currentChannels];
    const channelIndex = channels.findIndex(
        channel => channel.cid === channelId
    );

    if (channelIndex <= 0) return channels;

    const channel = channels[channelIndex];

    channels.splice(channelIndex, 1);
    channels.unshift(channel);
    return [...channels];
};

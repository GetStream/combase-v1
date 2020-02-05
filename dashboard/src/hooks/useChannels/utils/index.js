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

export const updateUserPresence = (
    currentChannels,
    channelId,
    userId,
    isOnline
) => {
    let channels = [...currentChannels];
    const channelIndex = channels.findIndex(
        channel => channel.cid === channelId
    );

    if (channelIndex === -1) return channels;

    let channel = channels[channelIndex];
    console.log('updating presence for channel', channel);
    if (userId !== channel.partner.id) return channels;

    channel.partner = {
        ...channel.partner,
        online: isOnline,
    };

    channels.splice(channelIndex, 1, channel);

    return [...channels];
};

import { useCallback, useState } from 'react';
import useCurrentChannel from './useCurrentChannel';

export default (channelId) => {
    const channel = useCurrentChannel(channelId);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [attachments, setAttachments] = useState([]);

    const upload = useCallback(async ({ target: { files } }) => {
        try {
            setLoading(true);
            let promises = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                promises = [...promises, channel.sendImage(file)];
            }
            const uploads = await Promise.all(promises);
            if (!attachments.length) {
                setAttachments(uploads.map(({ file }) => ({
                    type: 'image',
                    thumb_url: file,
                    asset_url: file,
                })));
            } else {
                const mergedAttachments = [
                    ...attachments,
                    ...uploads.map(({ file }) => ({
                        type: 'image',
                        thumb_url: file,
                        asset_url: file,
                    }))
                ];
                setAttachments(mergedAttachments);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }, []);

    return [attachments, { loading, error, upload }];
}
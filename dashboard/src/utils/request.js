const parseJSON = response => response.json();
export default async (path, method = 'get', options = {}, token) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_ENDPOINT}${path}`,
            {
                method: method.toUpperCase(),
                headers: {
                    Authorization: `Bearer ${token ||
                        process.env.REACT_APP_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                ...options,
            }
        ).then(parseJSON);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

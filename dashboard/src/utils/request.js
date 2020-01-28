const parseJSON = response => response.json();
export default async (path, method = 'get') => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_ENDPOINT}${path}`,
            {
                method: method.toUpperCase(),
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
            }
        ).then(parseJSON);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

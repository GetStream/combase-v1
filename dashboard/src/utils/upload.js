const parse = response => response.json();
export default async (file, token) => {
    console.log(file);
    const body = new FormData();
    body.append("file", file);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_ENDPOINT}v1/uploads`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token ||
                        process.env.REACT_APP_API_KEY}`,
                },
                body,
            }
        ).then(parse);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

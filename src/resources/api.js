const baseUrl = 'https://dev.codeleap.co.uk/careers/';

export const getPosts = async(url) => {
    
    const response = await fetch(
        url || baseUrl,
        {
            method: "GET",
        },
    );
    const responseJSON = await response.json();

    return responseJSON;
}

export const createPost = async(data) => {

    const response = await fetch(
        baseUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        },
    );

    const responseJSON = await response.json();

    return responseJSON;
}

export const editPost = async(id, data) => {

    const response = await fetch(
        `${baseUrl}${id}/`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        },
    );

    const responseJSON = await response.json();

    return responseJSON;
}

export const deletePost = async(id) => {

    await fetch(
        `${baseUrl}${id}/`,
        {
            method: "DELETE",
        },
    );

}

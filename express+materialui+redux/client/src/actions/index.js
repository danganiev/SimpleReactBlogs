export const createNewPost = (name, text) => ({
    type: 'CREATE_NEW_POST',
    name,
    text
})

export const updatePost = (id, name, text) => ({
    type: 'UPDATE_POST',
    id,
    name,
    text
})

export const loadPosts = () => ({
    type: 'LOAD_POSTS'
})

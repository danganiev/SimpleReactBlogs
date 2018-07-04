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

export const changePostName = (name) => ({
    type: 'CHANGE_POST_NAME',
    name
})

export const changePostText = (text) =>({
    type: 'CHANGE_POST_TEXT',
    text
})

export const closeError = () =>({
    type: 'CLOSE_ERROR'
})

export function loadPosts(){
    return dispatch => fetch('/api/posts')
        .then(res => res.json())
        .then(
            data => dispatch({type: 'LOAD_POSTS_SUCCESS', data}),
            err => dispatch({type: 'ERROR', error: err})
        )
}

export function loadSinglePost(postId){
    return dispatch => fetch('/api/post/' + postId)
        .then(res => res.json())
        .then(
            data => dispatch({type: 'LOAD_SINGLE_POST_SUCCESS', data}),
            err => dispatch({type: 'ERROR', error: err})
        )
}

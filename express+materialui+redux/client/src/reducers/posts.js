/*
{
    ...state
    posts: []
    currentPost: {
        name,
        text
    }
    error: {
        showError,
        message
    }
}
*/

const posts = (state = [], action) => {
    switch (action.type){
        case 'CREATE_NEW_POST':
            return [
                ...state,
                {
                    id: 123,
                    name: 'My new post',
                    text: 'Blabla'
                }
            ]
        case 'UPDATE_POST':
            return state
        case 'LOAD_POSTS_SUCCESS':
            return action.data
        default:
            return state
    }
}

const currentPost = (state, action) => {
    switch (action.type){
        case 'CHANGE_POST_TEXT':
            return {
                name: state.name,
                text: action.text
            }
        case 'CHANGE_POST_NAME':
            return {
                name: action.name,
                text: state.text
            }
        case 'LOAD_SINGLE_POST_SUCCESS':
            return action.data
        default:
            return {text:'', name:''}
    }
}

const errors = (state, action) => {
    switch (action.type){
        case 'ERROR':
            return {
                showError: true,
                message: 'Error happened'
            }
        case 'CLOSE_ERROR':
            return {
                ...state,
                showError: false,
            }
        default:
            return {
                showError: false,
                message: ''
            }
    }
}

export { posts, errors, currentPost }

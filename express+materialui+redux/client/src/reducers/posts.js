/*
{
    posts: []
    currentPost: {
        name,
        text
    }
    errorMessage: undefined
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

const errors = (state = null, action) => {
    switch (action.type){
        case 'ERROR':
            return 'An error happened'
        default:
            return state
    }
}

export { posts, errors, currentPost }

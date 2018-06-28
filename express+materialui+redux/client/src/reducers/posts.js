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
        case 'LOAD_POSTS':
            return [{
                id: 1232,
                name: 'Loaded post',
                text: 'my post'
            }]
        default:
            return state
    }
}

export default posts

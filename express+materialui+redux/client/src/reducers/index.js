import { combineReducers } from 'redux'
import { posts, errors, currentPost } from './posts'

export default combineReducers({
  posts,
  currentPost,
  errorMessage: errors
})

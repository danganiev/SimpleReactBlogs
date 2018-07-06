import { combineReducers } from 'redux'

import { routerReducer } from "react-router-redux";

import { posts, errors, currentPost } from './posts'

export default combineReducers({
  posts,
  currentPost,
  error: errors,
  router: routerReducer
})

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { routerMiddleware, routerReducer } from "react-router-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import gql from "graphql-tag";

import { posts, errors, currentPost } from './reducers/posts'
import Root from './root'

const history = createBrowserHistory()

const client = new ApolloClient({
  uri: "http://localhost:4000"
});


const store = createStore(
    combineReducers({
      posts,
      currentPost,
      error: errors,
      router: routerReducer,
      apollo: client.reducer(),
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(routerMiddleware(history), thunk)
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root store={store} history={history} />
    </ApolloProvider>,
    document.querySelector('#root')
);
// client
//   .query({
//     query: gql`
//       {
//         posts {
//             id,
//             name,
//             text
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

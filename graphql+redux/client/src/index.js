import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root'

import { createBrowserHistory } from 'history'

import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { routerMiddleware } from "react-router-redux";

import blogApp from './reducers';

const history = createBrowserHistory()

const store = createStore(
    blogApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(routerMiddleware(history), thunk)
)

ReactDOM.render(
    <Root store={store} history={history} />,
    document.querySelector('#root')
);

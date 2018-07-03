import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Root from './root'

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import blogApp from './reducers';

const store = createStore(
    blogApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
)

ReactDOM.render(
    <Root store={store} />,
    document.querySelector('#root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Root from './root'

import { createStore } from 'redux'

import blogApp from './reducers'

const store = createStore(blogApp)

ReactDOM.render(
    <Root store={store} />,
    document.querySelector('#root')
);

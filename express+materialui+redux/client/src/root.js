import React from 'react';

import Posts from './components/posts';

import { BrowserRouter, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import PropTypes from 'prop-types';


const Root = ({ store }) =>(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Posts} />
            </div>
        </BrowserRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root

import React from 'react';

import Posts from './components/posts';
import EditPost from './components/editPost'

import { Route } from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux'

import { Provider } from 'react-redux'
import PropTypes from 'prop-types';

const Root = ({ store, history }) =>(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Posts} />
                <Route path="/edit-post/:id/" component={EditPost} />
            </div>
        </ConnectedRouter>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root

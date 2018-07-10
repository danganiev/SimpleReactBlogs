import React from 'react';

import Posts from './components/posts';
import EditPost from './components/editPost'

import { Route, BrowserRouter } from 'react-router-dom'

const Root = ({ store, history, client }) =>(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Posts} />
            <Route path="/edit-post/:id/" render={props => (
                <EditPost client={client} {...props}></EditPost>
            )} />
        </div>
    </BrowserRouter>
)

export default Root

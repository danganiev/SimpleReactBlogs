import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './pages/posts/posts';
import NewPost from './pages/posts/newPost';
import EditPost from './pages/posts/editPost';

import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Posts} />
            <Route path="/new-post/" component={NewPost} />
            <Route path="/edit-post/:id/" component={EditPost} />
        </div>
    </BrowserRouter>
), document.querySelector('#root'));

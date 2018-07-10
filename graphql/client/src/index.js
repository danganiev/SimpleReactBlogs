import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"

import Root from './root'

const history = createBrowserHistory()

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root history={history} client={client} />
    </ApolloProvider>,
    document.querySelector('#root')
);

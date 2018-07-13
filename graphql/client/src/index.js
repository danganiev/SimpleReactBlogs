import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"

import Root from './root'

const history = createBrowserHistory()

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root history={history} client={client} />
    </ApolloProvider>,
    document.querySelector('#root')
);

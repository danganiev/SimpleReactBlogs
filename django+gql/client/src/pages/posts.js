// @flow

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from '../components/Header'

const GET_POSTS = gql`
  {
    posts {
        id
        name
        text
    }
  }
`

const withGetPostsQuery = graphql(GET_POSTS)

function SimpleTable({data}) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Topic</td>
            <td>Text</td>
          </tr>
        </thead>
        <tbody>
            {(() => {
                if (data.loading){
                    return <tr><td><p>Loading...</p></td></tr>
                }
                if (data.error){
                    return <tr><td><p>Error :(</p></td></tr>
                }

                return data.posts.map(n => {
                    return (
                      <tr key={n.id}>
                        <td component="th" scope="row">
                          <Link to={"/edit-post/"+n.id}><strong>{n.name}</strong></Link>
                        </td>
                        <td>{n.text}</td>
                      </tr>
                    );
                  })
            })()}
        </tbody>
      </table>
    </div>
  );
}

const SimpleTableWithData = withGetPostsQuery(SimpleTable)

class Props {}

class Posts extends React.Component<Props> {

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <Header />
                <SimpleTableWithData />
            </div>
        );
    }
}

export default Posts;

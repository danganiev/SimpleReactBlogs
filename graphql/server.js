const express = require('express');
const Sequelize = require('sequelize');

const models = require('./migrations')

const sequelize = new Sequelize('postgres://db_user:db_password@localhost:5432/simple_react_blog');

const { ApolloServer, gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        posts: [Post]
        post(id:Int): Post
    }

    type Mutation {
        addPost(name: String!, text: String): ResultMessage
        updatePost(id:Int!, name: String!, text:String): ResultMessage
        deletePost(id:Int!): ResultMessage
    }
`
const typeDefsPost = gql`
    # This "Post" type can be used in other type declarations.
    type Post {
        id: Int
        name: String
        text: String
    }

    type ResultMessage {
        success: Boolean
        message: String
    }
`;

// Resolvers define the technique for fetching the types in theawait
// schema. We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        posts() {
            const posts = models.Post.all()
            return posts
        },
        post(obj, {id}, context, info) {
            const post = models.Post.findById(id)
            return post
        }
    },
    Mutation: {
        addPost(obj, {name, text}){
            const post = models.Post.create({name: name, text:text});
            return {success: true}
        },
        updatePost(obj, {id, name, text}){
            models.Post.findById(id).then(post=>{
                post.name = name;
                post.text = text;

                post.save().then(() => {
                    return res.json({success: true})
                })
            })
            return {success: true}
        },
        deletePost(obj, {id}){
            const result = models.Post.findById(id).then(post=>{
                return post.destroy().then(()=>{
                    return {success: true}
                })
            }).catch(function(e){
                return {success: false}
            })

            return result
        }
    }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    typeDefs:[typeDefs, typeDefsPost],
    resolvers
});

// This `listen` method launches a web-server.    Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

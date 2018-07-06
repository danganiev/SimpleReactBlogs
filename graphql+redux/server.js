const express = require('express');
const Sequelize = require('sequelize');

const models = require('./migrations')

const sequelize = new Sequelize('postgres://db_user:db_password@localhost:5432/simple_react_blog');

// const app = express();
// app.use(express.json());
// const port = process.env.PORT || 5000;
//
// app.post('/api/post/new', (req, res) => {
//         models.Post.create({name: req.body.name, text:req.body.text});
// });
//
// app.delete('/api/post/:postId', (req, res)=>{
//         models.Post.findById(req.params.postId).then(post=>{
//                 post.destroy().then(()=>{
//                         return res.json({success: true})
//                 })
//         })
// });
//
// app.get('/api/post/:postId', (req, res)=>{
//         models.Post.findById(req.params.postId).then(post=>{
//                 return res.json(post);
//         })
//         // res.status(400);
//         // res.send('None shall pass');
// });
//
// app.post('/api/post/edit/:postId', (req, res)=>{
//         models.Post.findById(req.params.postId).then(post=>{
//                 post.name = req.body.name;
//                 post.text = req.body.text;
//
//                 post.save().then(() => {
//                         return res.json({success: true})
//                 })
//         })
// });
//
// app.get('/api/posts', (req, res)=>{
//         models.Post.all().then(posts =>{
//                 return res.json(posts);
//         });
// });
//
// app.listen(port, () => console.log('Listening on port ${port}'));

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
        updatePost(id:Int, name: String!, text:String): ResultMessage
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
        post(obj, args, context, info) {
            const post = models.Post.findById(8)
            return post
        }
    },
    Mutation: {
        addPost(obj, {name, text}){
            const post = models.Post.create({name: name, text:text});
            return {success:true}
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

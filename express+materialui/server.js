const express = require('express');
const Sequelize = require('sequelize');

const models = require('./migrations')

const sequelize = new Sequelize('postgres://db_user:db_password@localhost:5432/simple_react_blog');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/post/new', (req, res) => {
    models.Post.create({name: "Post", text:"blabla"})
});

app.post('/api/post/delete', (req, res)=>{

});

app.post('/api/post/edit/:postId', (req, res)=>{

});

app.get('/api/posts', (req, res)=>{
    models.Post.all().then(posts =>{
        return res.json(posts);
    });
});

app.listen(port, () => console.log('Listening on port ${port}'));

const express = require('express');
const Sequelize = require('sequelize');

const models = require('./migrations')

const sequelize = new Sequelize('postgres://db_user:db_password@localhost:5432/simple_react_blog');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.post('/api/post/new', (req, res) => {
    models.Post.create({name: req.body.name, text:req.body.text});
});

app.delete('/api/post/:postId', (req, res)=>{
    models.Post.findById(req.params.postId).then(post=>{
        post.destroy().then(()=>{
            return res.json({success: true})
        })
    })
});

app.get('/api/post/:postId', (req, res)=>{
    models.Post.findById(req.params.postId).then(post=>{
        return res.json(post);
    })
});

app.post('/api/post/edit/:postId', (req, res)=>{
    models.Post.findById(req.params.postId).then(post=>{
        post.name = req.body.name;
        post.text = req.body.text;

        post.save().then(() => {
            return res.json({success: true})
        })
    })
});

app.get('/api/posts', (req, res)=>{
    models.Post.all().then(posts =>{
        return res.json(posts);
    });
});

app.listen(port, () => console.log('Listening on port ${port}'));

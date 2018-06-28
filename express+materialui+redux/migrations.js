const Sequelize = require('sequelize');

// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://db_user:db_password@localhost:5432/simple_react_blog');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Post = sequelize.define('post', {
    name: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.TEXT
    }
});

var migrate = function(){
    Post.sync({force: true}).then(() => {
    });
}

module.exports.Post = Post;

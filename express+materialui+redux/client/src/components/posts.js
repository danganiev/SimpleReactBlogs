import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { loadPosts } from '../actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center'
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});


function SimpleTable(props) {
  const classes = theme => ({
      root: {
        width: '100%',
        marginTop: 100,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
    });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell>Text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  <Link to={"/edit-post/"+n.id}><strong>{n.name}</strong></Link>
                </TableCell>
                <TableCell>{n.text}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

class Posts extends React.Component {
    // state = {
    //     posts: []
    // };

    componentDidMount() {
        const { dispatch } = this.props;
        // this.callApi()
        //     .then(res => this.setState({ posts: res }))
        //     .catch(err => console.log(err));
        dispatch(loadPosts())
    }

    // callApi = async () => {
    //     const response = await fetch('/api/posts');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) throw Error(body.message);
    //
    //     return body;
    // };

    render() {
        const { classes, posts, dispatch } = this.props;

        console.log(this.props);

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Posts
                        </Typography>
                        <div>
                            <Button component={Link} color="inherit" to="/new-post/">Write new post</Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <SimpleTable posts={posts} />
            </div>
        );
    }
}

Posts.propTypes = {
    classes: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts
})

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Posts)));

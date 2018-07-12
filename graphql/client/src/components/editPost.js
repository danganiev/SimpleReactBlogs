import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

import ReactQuill from 'react-quill';

import { Link } from 'react-router-dom'

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

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

const GET_POST = gql`
    query post($id: Int!){
        post(id: $id)
        {
            name,
            text
        }
    }
`;

const DELETE_POST = gql`
mutation deletePost($id: Int!){
  deletePost(id: $id){
  	success
  }
}`;

const EDIT_POST = gql`
mutation updatePost($id:Int!, $name:String!, $text:String){
    updatePost(id: $id, name: $name, text: $text){
        success
    }
}`;

const ErrorBox = ({error}) => (
    <Dialog open={error.showError}
      aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{ error.message }</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { error.message }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
)

class EditPost extends React.Component {
    componentDidMount(){
        const { client, match } = this.props;

        const { data } = client.query({
            query: GET_POST,
            variables: { id: match.params.id }
        })
    }

    render() {
        const { classes, currentPost, error, match } = this.props;

        return (
            <div className={classes.root}>
                <Query query={GET_POST} variables={{id: match.params.id}}>
                    {({loading, error, data}) => {
                        if (loading)
                            return <div>Loading...</div>
                        if (error)
                            return <div>Error!</div>

                        let postName, postEditor;

                        return (
                            <div>
                                <AppBar position="static">
                                    <Toolbar>
                                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                                            <MenuIcon/>
                                        </IconButton>
                                        <Mutation mutation={DELETE_POST}>
                                            {(deletePost, { data, error }) => (
                                                <span>
                                                    <Button color="inherit" onClick={() => {deletePost({variables: {id: match.params.id}})}}>Delete</Button>
                                                    {
                                                        error && <ErrorBox error={error}></ErrorBox>
                                                    }
                                                </span>
                                            )}
                                        </Mutation>
                                        <Input defaultValue={data.post.name} ref={ node => postName = node } />
                                        <Mutation mutation={EDIT_POST}>
                                            {(updatePost, { data, error }) => (
                                                <span>
                                                    <Button color="inherit" onClick={() => {
                                                        debugger;
                                                        updatePost({variables: {
                                                            id: match.params.id,
                                                            name: postName.value,
                                                            text: postEditor.value
                                                        }})
                                                    }}>Save</Button>
                                                    {
                                                        error && <ErrorBox error={error}></ErrorBox>
                                                    }
                                                </span>
                                            )}
                                        </Mutation>
                                    </Toolbar>
                                </AppBar>
                                <div style={{'height': '800px', 'width':'50%', 'paddingTop':'50px', 'margin': '0 auto'}}>
                                    <ReactQuill value={data.post.text} style={{'height': '100%'}} ref={node => postEditor = node}></ReactQuill>
                                </div>
                                <Button>Save</Button>
                                {
                                    error && <ErrorBox error={error}></ErrorBox>
                                }
                            </div>
                        )
                    }}
                </Query>
            </div>
        );
    }
};

EditPost.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(EditPost));

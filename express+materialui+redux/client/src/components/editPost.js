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

import { connect } from 'react-redux'

import { loadSinglePost, changePostName, changePostText, closeError } from '../actions'


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


class EditPost extends React.Component {

    constructor(props) {
        super(props);
        // this.getPost = this.getPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
      }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(loadSinglePost(this.props.match.params.id))
    }

    updatePost = () => {
        // dispatch(updatePost(this.props.match.params.id, ))
    }

    deletePost = () => {
        // dispatch(deletePost(this.props.match.params.id))
    }

    render() {
        const { classes, dispatch, currentPost, error } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit" onClick={this.deletePost}>Delete</Button>
                        <Input value={currentPost.name} onChange={event => dispatch(changePostName(event.target.value))} />
                        <Button color="inherit" onClick={this.sendPost}>Save</Button>
                    </Toolbar>
                </AppBar>
                <div style={{'height': '800px', 'width':'50%', 'paddingTop':'50px', 'margin': '0 auto'}}>
                    <ReactQuill value={currentPost.text} onChange={event => dispatch(changePostText(event))} style={{'height': '100%'}}></ReactQuill>
                </div>
                <Button>Save</Button>
                <Dialog open={error.showError}
                  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title">{ error.message }</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      { error.message }
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => dispatch(closeError())} color="primary" autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
            </div>
        );
    }
};

EditPost.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: state.currentPost,
  error: state.error
})

export default connect(mapStateToProps)(withRoot(withStyles(styles)(EditPost)));

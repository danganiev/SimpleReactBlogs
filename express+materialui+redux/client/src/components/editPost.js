import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import withRoot from '../withRoot';

import ReactQuill from 'react-quill';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { loadSinglePost, changePostName, changePostText } from '../actions'


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

    // getPost = async () => {
    //     const response = await fetch('/api/post/' + this.props.match.params.id,{
    //         method: 'GET'
    //     });
    //
    //     const body = await response.json();
    //
    //     this.setState({
    //         name: body.name,
    //         text: body.text
    //     })
    //
    //     if (response.status !== 200) throw Error(body.message);
    // }

    updatePost = () => {
        // dispatch(updatePost(this.props.match.params.id, ))
    }

    deletePost = () => {
        // dispatch(deletePost(this.props.match.params.id))
    }

    render() {
        const { classes, dispatch, currentPost } = this.props;

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
            </div>
        );
    }
};

EditPost.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentPost: state.currentPost
})

export default connect(mapStateToProps)(withRoot(withStyles(styles)(EditPost)));

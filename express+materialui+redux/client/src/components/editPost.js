import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import withRoot from '../../withRoot';

import ReactQuill from 'react-quill';

import { Link } from 'react-router-dom'


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
        this.getPost = this.getPost.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
      }

    state = {
        name: '',
        text: ''
    };

    componentDidMount(){
        this.getPost();
    }

    getPost = async () => {
        const response = await fetch('/api/post/' + this.props.match.params.id,{
            method: 'GET'
        });

        const body = await response.json();

        this.setState({
            name: body.name,
            text: body.text
        })

        if (response.status !== 200) throw Error(body.message);
    }

    sendPost = async () => {
        const response = await fetch('/api/post/edit/' + this.props.match.params.id,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
    }

    deletePost = async () => {
        const response = await fetch('/api/post/' + this.props.match.params.id,{
            method: 'DELETE'
        });

        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
    }

    render() {
        const { classes, match } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit" onClick={this.deletePost}>Delete</Button>
                        <Input value={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                        <Button color="inherit" onClick={this.sendPost}>Save</Button>
                    </Toolbar>
                </AppBar>
                <div style={{'height': '800px', 'width':'50%', 'paddingTop':'50px', 'margin': '0 auto'}}>
                    <ReactQuill value={this.state.text} onChange={html => this.setState({text: html})} style={{'height': '100%'}}></ReactQuill>
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

export default withRoot(withStyles(styles)(EditPost));

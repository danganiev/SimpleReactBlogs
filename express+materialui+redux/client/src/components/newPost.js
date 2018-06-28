import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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

class NewPost extends React.Component {
    state = {
        name: '',
        text: ''
    };

    sendPost = async () => {
        const response = await fetch('/api/post/new',{
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

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                            <MenuIcon/>
                        </IconButton>
                        <Input defaultValue={this.state.name} onChange={event => this.setState({name: event.target.value})} />
                        <Button color="inherit" onClick={this.sendPost}>Save</Button>
                    </Toolbar>
                </AppBar>
                <div style={{'height': '800px', 'width':'50%', 'paddingTop':'50px', 'margin': '0 auto'}}>
                    <ReactQuill defaultValue={this.state.text} style={{'height': '100%'}}
                    onChange={html => this.setState({text: html})}></ReactQuill>
                </div>
                <Button>Save</Button>
            </div>
        );
    }
}

NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NewPost));

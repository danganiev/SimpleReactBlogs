import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import withRoot from '../../withRoot';

import ReactQuill from 'react-quill';


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
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            New post
                        </Typography>
                        <Button color="inherit">Save</Button>
                    </Toolbar>
                </AppBar>
                <div style={{'height': '800px', 'width':'50%', 'padding-top':'50px', 'margin': '0 auto'}}>
                    <ReactQuill style={{'height': '100%'}}></ReactQuill>
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

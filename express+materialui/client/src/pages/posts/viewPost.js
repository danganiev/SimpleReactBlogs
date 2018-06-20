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

// class ViewPost extends React.Component {
//     state = {
//     };
//
//     render() {
//         const { classes } = this.props;
//
//         return (
//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="title" color="inherit" className={classes.flex}>
//                             New post
//                         </Typography>
//                         <Button color="inherit">Save</Button>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//         );
//     }
// }
//
// NewPost.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const ViewPost = ({ classes, match }) => (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Post name { match.params.id }
                </Typography>
                <Button color="inherit">Save</Button>
            </Toolbar>
        </AppBar>
    </div>
);

ViewPost.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(ViewPost));

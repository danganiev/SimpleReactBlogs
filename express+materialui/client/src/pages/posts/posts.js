import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

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

let id = 0;
function createData(name, firstQuote) {
  id += 1;
  return { id, name, firstQuote};
}

const data = [
  createData('Who is literally Hitler?', 'I think it might have been Hitler himself. Although...'),
  createData("10 things you didn't know about beavers eating sausages", "1. They are rare game these days..."),
];

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
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  <Link to={"/post/"+n.id}><strong>{n.name}</strong></Link>
                </TableCell>
                <TableCell>{n.firstQuote}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

class Posts extends React.Component {
    state = {
        response: ''
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
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
                            Posts
                        </Typography>
                        <div>
                            <Button component={Link} color="inherit" to="/new-post/">Write new post</Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <SimpleTable />
            </div>
        );
    }
}

Posts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Posts));

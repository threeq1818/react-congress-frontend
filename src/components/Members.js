import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { fetchMembers } from '../actions/members';

const styles = theme => ({
  searchPaper: {
    'margin-bottom': 0,
    // 'background-color': '#a6adbd',
    padding: '15px 30px',
    // height: 48,
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchFormat: {
    padding: 5,
    border: '5px solid #ced4da',
    width: '18%'
  },
  iconButton: {
    'border-radius': '0',
    padding: 5,
    border: '5px solid #ced4da',
  },
  input: {
    padding: 5,
    border: '5px solid #ced4da',
    width: '100%'
  },
  searchContainer: {
    margin: 'auto 16px',
    width: 'calc(100% - 48px - 32px)' // 48px button + 32px margin
  }
});

class Members extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'Senator',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.searchPaper}>
          <Select
            className={classes.searchFormat}
            value={this.state.value}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value={10}>Both</MenuItem>
            <MenuItem value={20}>Senators</MenuItem>
            <MenuItem value={30}>Representatives</MenuItem>
          </Select>
          <div className={classes.searchContainer}>
            <InputBase
              fullWidth
              className={classes.input}
              placeholder="Input Name"
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </React.Fragment >
    );
  }
}


Members.propTypes = {
  // members: PropTypes.array.isRequired,
  // errors: PropTypes.any.isRequired,
}

const mapStateToProps = (state) => {
  return {
    members: state.members, //[]
    errors: state.errors
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { fetchMembers })
);

export default enhance(Members)
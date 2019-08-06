//  components/CustomTablePagination.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  searchPaper: {
    'margin-bottom': 0,
    'background-color': '#a6adbd',
    padding: '15px 20px',
    'border-radius': 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  iconButton: {
    color: '#fff',
    'background-color': '#1b4b6f',
    'border-radius': '0',
    padding: 5,
    border: '3px solid #1b4b6f',
  },
  searchInput: {
    'font-size': 12,
    'background-color': '#fff',
    padding: 5,
    border: '3px solid #1b4b6f',
    width: '100%'
  },
  searchContainer: {
    margin: 'auto',
    width: 'calc(100% - 32px)' // 48px button + 32px margin
  },
}));

function CustomSearch(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(props.initValue);

  function handleChange(e) {
    if (e.target) {
      setValue(e.target.value);
    }
  }

  return (
    <Paper className={classes.searchPaper}>
      <div className={classes.searchContainer}>
        <InputBase
          fullWidth
          className={classes.searchInput}
          placeholder="Input Name"
          inputProps={{ 'aria-label': 'Search' }}
          onChange={handleChange}
          value={value}
        />
      </div>
      <IconButton className={classes.iconButton} onClick={props.onClickSearch(value)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

CustomSearch.propTypes = {
  initValue: PropTypes.string.isRequired,
  onClickSearch: PropTypes.func.isRequired,
};

export default CustomSearch
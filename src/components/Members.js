// components/Members.js

import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';

import { searchMembers } from '../actions/members';
import { FormLabel } from '@material-ui/core';
import TwoValueSlider from './TwoValueSlider';
import CustomTablePagination from './CustomTablePagination';
import { callbackify } from 'util';
import { borderBottom } from '@material-ui/system';

const styles = theme => ({
  root: {
    'font-size': '12px',
    width: '100%',
    'background-color': '#f7f7f7'
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#0005',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 'xl'
  },
  searchPaper: {
    'margin-bottom': 0,
    'background-color': '#a6adbd',
    padding: '15px 20px',
    'border-radius': 0,
    display: 'flex',
    justifyContent: 'space-between'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  searchFormat: {
    'font-size': 12,
    'background-color': '#fff',
    padding: 5,
    border: '3px solid #1b4b6f',
    width: '18%'
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
  resultPaper: {
    'margin-bottom': 0,
    // 'background-color': '#a6adbd',
    padding: '15px 20px',
    'border-radius': 0,
    display: 'flex',
    justifyContent: 'space-between',
    'padding': '30px',
    '-webkit-box-sizing': 'border-box',
    'box-sizing': 'border-box',
    'overflow': 'auto'
  },
  searchResultsWrapper: {

  },
  // text: {
  //   margin: '20px'
  // },
  formControl: {
    borderRadius: 4,
    border: '1px solid #ced4da',
    'font-size': '12px'
  },
  searchTune: {
    width: '100%',
    'align-items': 'center',
    display: 'flex',
    'flex-direction': 'row',
  },
  button: {
    width: 'calc(27% - 0px)',
    'font-size': '12px',
  },
  pagination: {
    width: '38%'
  },
  total_votes: {
    'margin-left': '30px',
    width: '20%'
  },
  vote_percentage: {
    'margin-left': '30px',
    width: '20%'
  },
  searchTuneNumber: {
    'margin-left': '15%',
    display: 'flex',
    'flex-direction': 'row',
  },
  searchRow: {
  },
  searchColumnMain: {
    '-webkit-box-flex': 1,
    '-ms-flex': 1,
    flex: 1,
    '-webkit-box-sizing': 'border-box',
    'box-sizing': 'border-box',
    'padding-left': '15px',
    'padding-right': '15px',
    overflow: 'auto',
    '-webkit-box-ordinal-group': 3,
    '-ms-flex-order': 2,
    order: 2,
    display: 'block',
  },
  searchColumnNav: {
    '-webkit-box-flex': 0,
    '-ms-flex': 'none',
    flex: 'none',
    '-webkit-box-sizing': 'border-box',
    'box-sizing': 'border-box',
    'padding-right': '15px',
    overflow: 'auto',
    width: '27%',
    '-webkit-box-ordinal-group': 2,
    '-ms-flex-order': 1,
    order: 1,
    display: 'block'
  },
  strongDivider: {
    'background-color': '#2e242a',
    border: '1px solid #2e242a',
  },
  congress_row: {
    position: 'relative'
  },
  filter_button_listitemtext: {
    color: '#000',
    marginLeft: '-12px'
  },
  filter_collapse_list_listitem: {
    paddingTop: 0,
    paddingBottom: 0,
    'align-items': 'center',
    borderBottom: '1px solid #dddddd'
  },
  filter_collapse_list_checkbox: {
    paddingTop: 0,
    paddingBottom: 0,
    'align-items': 'center'
  },
  filter_checkbox_label: {
    'color': '#000',
    'font-size': '12px'
  },
  congress_filtercount: {
    'align-self': 'center',
    'font-size': '12px !important',
    position: 'absolute',
    'right': '5px'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatar: {
    position: 'relative',
    display: 'flex',
    'flex-direction': 'row',
    'flex-grow': 0,
    'flex-shrink': 0,
    overflow: 'hidden',
    'align-items': 'center',
    'background-color': 'rgb(229, 228, 232)',
    width: '100px',
    height: '100px',
    'border-radius': '50px',
    'justify-content': 'center',
    'white-space': 'pre',
    'text-overflow': 'ellipsis',
    'font-size': '25px',
    color: 'rgb(0, 120, 212)',
    'font-family': "'SF Bold', 'Segoe System UI Bold', 'Segoe UI Bold', 'sans-serif",
    'font-weight': '400',
  },
  record: {
    'margin': '10px',
  },
  recordgriditem: {
    'margin-left': '30px'
  },
});

class Members extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isLoading: false,
      searchvalue: '',
      perpage: 10,
      congress: false,
      chamber: true,
      party: true,
      yone: true,
      gender: true,
      congressChecked: [116],
      chamberChecked: ['Senate'],
      partyChecked: [],
      yoneChecked: [],
      genderChecked: [],
    }

    this.localSearchValue = '';
    this.onSearch = this.onSearch.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleClickListExpand = this.handleClickListExpand.bind(this);
    this.handleCongressToggle = this.handleCongressToggle.bind(this);
    this.handleChamberToggle = this.handleChamberToggle.bind(this);
    this.handlePartyToggle = this.handlePartyToggle.bind(this);
    this.handleYONEToggle = this.handleYONEToggle.bind(this);
    this.handleGenderToggle = this.handleGenderToggle.bind(this);

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  onSearch(event) {
    // debugger
    this.setState({ searchvalue: this.localSearchValue });
    let data = {};
    data.sessions = this.state.congressChecked;
    data.chamber = this.state.chamberChecked;
    data.searchValue = this.localSearchValue;
    data.party = this.state.partyChecked;
    data.nextElection = this.state.nextElection;
    data.gender = this.genderChecked;
    data.total_votes = [];
    data.votes_party_percentage = {};
    this.props.searchMembers(data);
  }

  onChangeSearchValue(event) {
    // debugger
    if (event.currentTarget)
      this.localSearchValue = event.currentTarget.value;
  }

  handleCongressToggle = value => (event) => {
    const currentIndex = this.state.congressChecked.indexOf(value);
    const newChecked = [...this.state.congressChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ congressChecked: newChecked });
  }

  handleChamberToggle = value => (event) => {
    const currentIndex = this.state.chamberChecked.indexOf(value);
    const newChecked = [...this.state.chamberChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ chamberChecked: newChecked });
  }

  handlePartyToggle = value => (event) => {
    const currentIndex = this.state.partyChecked.indexOf(value);
    const newChecked = [...this.state.partyChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ partyChecked: newChecked });
  }

  handleYONEToggle = value => (event) => {
    const currentIndex = this.state.yoneChecked.indexOf(value);
    const newChecked = [...this.state.yoneChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ yoneChecked: newChecked });
  }

  handleGenderToggle = value => (event) => {
    const currentIndex = this.state.genderChecked.indexOf(value);
    const newChecked = [...this.state.genderChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({ genderChecked: newChecked });
  }

  handleClickListExpand = sname => (event) => {
    this.setState({ [sname]: !this.state[sname] });
  }

  //list expand 
  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.members.loading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" size={60} thickness={10} />
          </div>
        ) : null}
        <Container maxWidth="xl">
          {/* <CssBaseline /> */}
          <Paper className={classes.searchPaper}>
            {/* <form className={classes.form} onSubmit={this.handleSubmit} noValidate> */}
            {/* <Select
              className={classes.searchFormat}
              value={this.state.searchfield}
              onChange={this.handleChange('searchfield')}
            >
              <MenuItem value={10}>Both</MenuItem>
              <MenuItem value={20}>Senators</MenuItem>
              <MenuItem value={30}>Representatives</MenuItem>
            </Select> */}
            <div className={classes.searchContainer}>
              <InputBase
                fullWidth
                className={classes.searchInput}
                placeholder="Input Name"
                inputProps={{ 'aria-label': 'Search' }}
                onChange={this.onChangeSearchValue}
              // value={this.localSearchValue}
              />
            </div>
            <IconButton className={classes.iconButton} aria-label="search" onClick={this.onSearch}>
              <SearchIcon />
            </IconButton>
            {/* </form> */}
          </Paper>
          <Paper className={classes.resultPaper}>
            <Grid container className={classes.searchResultsWrapper}>
              <Grid className={classes.searchTune} item row='true'>
                {/* <Paper> */}
                <Button variant="outlined" color="secondary" className={classes.button}>
                  Hide Filters
                </Button>
                <Grid className={classes.total_votes}>
                  <Typography variant="body2">total votes</Typography>
                  <TwoValueSlider
                    valueLabelDisplay="auto"
                    // ThumbComponent={AirbnbThumbComponent}
                    aria-label="airbnb slider"
                    defaultValue={[20, 40]}
                  />
                </Grid>
                <Grid className={classes.vote_percentage}>
                  <Typography variant="body2">votes with party percentage</Typography>
                  <TwoValueSlider
                    valueLabelDisplay="auto"
                    // ThumbComponent={AirbnbThumbComponent}
                    aria-label="airbnb slider"
                    defaultValue={[20, 40]}
                  />
                </Grid>
                <TablePagination
                  className={classes.pagination}
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={100}
                  rowsPerPage={10}
                  page={1}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                // onChangePage={handleChangePage}
                // onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                {/* </Paper> */}
              </Grid>
              <Grid container className={classes.searchRow}>
                <Grid container className={classes.searchColumnMain}>
                  <Grid className={classes.searchResultList}>
                    <Paper className={classes.paper}>
                      <Grid container gutterbottom='true' className={classes.record}>
                        <Grid item>
                          <Typography variant="subtitle1">
                            1. Senator Full Name
                          </Typography>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <ButtonBase className={classes.avatar}>
                              QA
                              {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container className={classes.recordgriditem} >
                            <Grid item xs container direction="column">
                              <Grid item xs>
                                <Typography variant="body2">
                                  <b>State:</b> South Dakota
                                </Typography>
                                <Typography variant="body2">
                                  <b>Party:</b> Republic
                                </Typography>
                                <Typography variant="body2">
                                  <b>District:</b> 1
                                </Typography>
                                <Typography variant="body2">
                                  <b>Next Election:</b> 2020
                                </Typography>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                  <b>Office:</b>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container className={classes.record}>
                        <Grid item>
                          <Typography variant="subtitle1">
                            1. Senator Full Name
                          </Typography>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <ButtonBase className={classes.avatar}>
                              QA
                              {/* <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" /> */}
                            </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container className={classes.recordgriditem} >
                            <Grid item xs container direction="column">
                              <Grid item xs>
                                <Typography variant="body2">
                                  <b>State:</b> South Dakota
                                </Typography>
                                <Typography variant="body2">
                                  <b>Party:</b> Republic
                                </Typography>
                                <Typography variant="body2">
                                  <b>District:</b> 1
                                </Typography>
                                <Typography variant="body2">
                                  <b>Next Election:</b> 2020
                                </Typography>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                  <b>Office:</b>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid className={classes.navPageTop}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={100}
                      rowsPerPage={10}
                      page={1}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      // onChangePage={handleChangePage}
                      // onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={CustomTablePagination}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.searchColumnNav} column='true'>
                  <List
                    component="nav"
                    aria-labelledby="filter list"
                    disablePadding
                  //             subheader={
                  //               <ListSubheader component="div" id="nested-list-subheader">
                  //                 Nested List Items
                  // </ListSubheader>
                  //             }
                  // className={classes.root}
                  >
                    <ListItem button onClick={this.handleClickListExpand('congress')} aria-labelledby="congress listitem button" >
                      <ListItemText secondary="Congress" aria-labelledby="filter congress-button listitemtext" classes={{ secondary: classes.filter_button_listitemtext }} />
                      {this.state.congress ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.congress} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {[...Array(36)].map((_, index) => (
                          <ListItem button
                            key={116 - index} role={undefined}
                            onClick={this.handleCongressToggle(116 - index)}
                            className={classes.filter_collapse_list_listitem}
                          >
                            <Checkbox
                              edge="start"
                              checked={this.state.congressChecked.includes(116 - index) !== false}
                              tabIndex={-1}
                              className={classes.filter_collapse_list_checkbox}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            {/* </ListItemIcon> */}
                            <ListItemText id={index} primary={`${116 - index} (${2019 - index * 2}-${2020 - index * 2})`} classes={{ primary: classes.filter_checkbox_label }} />
                            {/* <ListItemText id='2' primary={`[100]`} classes={{ primary: classes.congress_filtercount }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <ListItem button onClick={this.handleClickListExpand('chamber')}>
                      <ListItemText secondary="Chamber" aria-labelledby="filter chamber-button  listitemtext" classes={{ secondary: classes.filter_button_listitemtext }} />
                      {this.state.chamber ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.chamber} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {['Senate', 'House'].map((value, index) => (
                          <ListItem button
                            key={value} role={undefined}
                            onClick={this.handleChamberToggle(value)}
                            className={classes.filter_collapse_list_listitem}
                          >
                            {/* <ListItemIcon> */}
                            <Checkbox
                              edge="start"
                              checked={this.state.chamberChecked.includes(value) !== false}
                              tabIndex={-1}
                              className={classes.filter_collapse_list_checkbox}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            {/* </ListItemIcon> */}
                            <ListItemText id={index} primary={value} classes={{ primary: classes.filter_checkbox_label }} />
                            {/* <ListItemText id='2' primary={`[100]`} classes={{ primary: classes.congress_filtercount }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <ListItem button onClick={this.handleClickListExpand('party')}>
                      <ListItemText secondary="Party" aria-labelledby="filter chamber-button  listitemtext" classes={{ secondary: classes.filter_button_listitemtext }} />
                      {this.state.party ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.party} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {['Democratic', 'Republican', 'Independent', 'Independent Democrat'].map((value, index) => (
                          <ListItem button
                            key={value} role={undefined}
                            onClick={this.handlePartyToggle(value)}
                            className={classes.filter_collapse_list_listitem}
                          >
                            {/* <ListItemIcon> */}
                            <Checkbox
                              edge="start"
                              checked={this.state.partyChecked.includes(value) !== false}
                              tabIndex={-1}
                              className={classes.filter_collapse_list_checkbox}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            {/* </ListItemIcon> */}
                            <ListItemText id={index} primary={value} classes={{ primary: classes.filter_checkbox_label }} />
                            {/* <ListItemText id='2' primary={`[100]`} classes={{ primary: classes.congress_filtercount }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <ListItem button onClick={this.handleClickListExpand('yone')}>
                      <ListItemText secondary="Year of next election" aria-labelledby="filter chamber-button  listitemtext" classes={{ secondary: classes.filter_button_listitemtext }} />
                      {this.state.yone ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.yone} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {[...Array(9)].map((value, index) => (
                          <ListItem dense button
                            key={2028 - index} role={undefined}
                            onClick={this.handleYONEToggle(2028 - index)}
                            className={classes.filter_collapse_list_listitem}
                          >
                            {/* <ListItemIcon> */}
                            <Checkbox
                              edge="start"
                              checked={this.state.yoneChecked.includes(2028 - index) !== false}
                              tabIndex={-1}
                              className={classes.filter_collapse_list_checkbox}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            {/* </ListItemIcon> */}
                            <ListItemText id={index} primary={2028 - index} classes={{ primary: classes.filter_checkbox_label }} />
                            {/* <ListItemText id='2' primary={`[100]`} classes={{ primary: classes.congress_filtercount }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>

                    <ListItem button onClick={this.handleClickListExpand('gender')}>
                      <ListItemText secondary="Gender" aria-labelledby="filter chamber-button  listitemtext" classes={{ secondary: classes.filter_button_listitemtext }} />
                      {this.state.gender ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.gender} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {['Male', 'Female'].map((value, index) => (
                          <ListItem dense button
                            key={value} role={undefined}
                            onClick={this.handleGenderToggle(value)}
                            className={classes.filter_collapse_list_listitem}
                          >
                            {/* <ListItemIcon> */}
                            <Checkbox
                              edge="start"
                              checked={this.state.genderChecked.includes(value) !== false}
                              tabIndex={-1}
                              className={classes.filter_collapse_list_checkbox}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                            />
                            {/* </ListItemIcon> */}
                            <ListItemText id={index} primary={value} classes={{ primary: classes.filter_checkbox_label }} />
                            {/* <ListItemText id='2' primary={`[100]`} classes={{ primary: classes.congress_filtercount }} /> */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container >
      </div >
    );
  }
}


Members.propTypes = {
  // members: PropTypes.array.isRequired,
  // errors: PropTypes.any.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    members: state.members
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { searchMembers })
);

export default enhance(Members)
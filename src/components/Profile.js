// components/Profile.js

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Paper, Grid, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { fetchProfile } from '../actions/members';
import { isEmpty } from '../validation/is-empty';
import { makeFullPartyName } from '../global';

const styles = theme => ({
  root: {
    'font-size': '12px',
    width: '100%',
    'background-color': '#f7f7f7'
  },
  loading: {
    position: 'fixed',
    width: '100%',
    top: 0,
    bottom: 0,
    background: '#0005',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    background: '#e8e8e8ff',
    maxWidth: 'xl',
    padding: 0
  },
  overview: {
    background: '#e8e8e8ff',
    minWidth: '200px',
    padding: '50px',
  },
  details: {
    background: '#fff',
    width: '100%'
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
    width: '150px',
    height: '150px',
    // 'border-radius': '50px',
    'justify-content': 'center',
    'white-space': 'pre',
    'text-overflow': 'ellipsis',
    'font-size': '25px',
    color: 'rgb(0, 120, 212)',
    'font-family': "'SF Bold', 'Segoe System UI Bold', 'Segoe UI Bold', 'sans-serif",
    'font-weight': '400',
  },
  recordgriditem: {
    'margin-left': '80px'
  },
  table: {
    minWidth: 650,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.props.fetchProfile({ member_id: params.get('id') });
  }

  makeAvatarString() {
    let retName = '';
    const { profile } = this.props.profile;
    if (isEmpty(profile.first_name) === false)
      retName = profile.first_name.substr(0, 1).toUpperCase();
    if (isEmpty(profile.middle_name) === false)
      retName = retName + profile.middle_name.substr(0, 1).toUpperCase();
    if (isEmpty(profile.last_name) === false)
      retName = retName + profile.last_name.substr(0, 1).toUpperCase();
    return retName;
  }

  calcCongressYear(index) {
    // return ''+(2018 + (index -116)*2 )
  }
  render() {
    const { classes } = this.props;
    const { profile } = this.props.profile;
    return (
      <div className={classes.root} aria-label='root'>
        {this.props.profile.loading ? (
          <div className={classes.loading}>
            <CircularProgress color="primary" size={60} thickness={5} />
          </div>
        ) : null}
        <Container className={classes.container} aria-label='container'>
          {(!profile || (this.props.profile.error !== null) === true) ?
            <>
            </> :
            <Grid container aria-label='grid root'>
              <div className={classes.overview} aria-label='overview paper'>
                <Paper aria-label='overview paper' style={{ padding: '30px' }}>
                  <Grid item aria-label='member-name grid'>
                    <Typography variant="h6" display='inline'>
                      {profile.first_name} {' '}
                      {profile.middle_name} {profile.last_name}
                    </Typography>
                    <Typography variant="body2" display='inline'>
                      {'  '}({profile.date_of_birth})
                    </Typography>
                  </Grid>
                  <Grid container aria-label='member-data grid'>
                    <Grid item>
                      <ButtonBase className={classes.avatar}>
                        {this.makeAvatarString()}
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.recordgriditem} >
                      <Grid item xs container direction="column">
                        {/* <Grid item xs> */}
                        {(!profile.state === true) ? <></> :
                          <Typography variant="body2">
                            <b>State:</b> {profile.state}
                          </Typography>
                        }
                        {(!profile.district === true) ? <></> :
                          <Typography variant="body2">
                            <b>District:</b> {profile.district}
                          </Typography>
                        }
                        {(!profile.url === true) ? <></> :
                          <Typography variant="body2">
                            <b>Web site:</b> <a target='_blank' href={profile.url}>{profile.url}</a>
                          </Typography>
                        }
                        {(!profile.current_party === true) ? <></> :
                          <Typography variant="body2">
                            <b>Party:</b> {makeFullPartyName(profile.current_party)}
                          </Typography>
                        }
                        {(!profile.gender === true) ? <></> :
                          <Typography variant="body2">
                            <b>Gender:</b> {profile.gender}
                          </Typography>
                        }
                        {(!profile.last_updated === true) ? <></> :
                          <Typography variant="body2">
                            <b>Last updated:</b> {profile.last_updated}
                          </Typography>
                        }
                        {(!profile.twitter_account === true) ? <></> :
                          <Typography variant="body2">
                            <b>Twitter:</b> <a target="_blank" href={`https://twitter.com/${profile.twitter_account}`}>{profile.twitter_account}</a>
                          </Typography>
                        }
                        {(!profile.facebook_account === true) ? <></> :
                          <Typography variant="body2">
                            <b>Facebook:</b>  <a target="_blank" href={`https://facebook.com/${profile.twitter_account}`}>{profile.twitter_account}</a>
                          </Typography>
                        }
                        {(!profile.youtube_account === true) ? <></> :
                          <Typography variant="body2">
                            <b>Youtube:</b>  <a target="_blank" href={`https://youtube.com/user/${profile.twitter_account}`}>{profile.twitter_account}</a>
                          </Typography>
                        }
                        {/* </Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
              <div className={classes.details}>
                <Grid column='true'>
                  {!profile.roles === true ? <></> : profile.roles.map((role, index) => (
                    <Paper key={index} style={{ borderRadius: 0 }}>
                      <Grid container column='true' style={{ fontSize: '14px', padding: '10px' }} >
                        <Grid>
                          <Typography variant='subtitle1' display='inline' style={{ fontWeight: 600 }}>Congress - {role.congress}</Typography><sup>th</sup>
                        </Grid>
                        <Grid container row='true' style={{ display: 'flex', padding: '10px' }}>
                          <div style={{ flex: 1, marginBottom: 30 }}>
                            <Grid style={{ display: 'flex' }} column='true'>
                              <div style={{ flex: 1 }}>
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>Chamber:  </Typography>{role.chamber}<br />
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>State:  </Typography>{role.state}<br />
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>District:  </Typography>{role.district}<br />
                              </div>
                              <div style={{ flex: 1 }}>
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>Start date:  </Typography>{role.start_date}<br />
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>End date:  </Typography>{role.end_date}<br />
                                <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600 }}>Phone:  </Typography>{role.phone}<br />
                              </div>
                            </Grid>
                            <Typography variant='subtitle2' display='inline' style={{ fontWeight: 600, flex: 2 }}>Office:  </Typography>{role.office}<br />
                          </div>
                          <Grid style={{ flex: 2 }} column='true'>
                            <Grid style={{ marginTop: -30 }}>
                              <Typography variant='subtitle1' style={{ fontWeight: 600 }}>Committees/Subcommittees </Typography>
                            </Grid>
                            <Grid>
                              <Table className={classes.table} padding='none'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Code</TableCell>
                                    <TableCell align="right">Begin date</TableCell>
                                    <TableCell align="right">End date</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody >
                                  {!role.committees === true ? <></> : role.committees.map((committee, index) => (
                                    <TableRow key={index}>
                                      <TableCell component="th" scope="row">
                                        {committee.name}
                                      </TableCell>
                                      <TableCell align="right" >{committee.code}</TableCell>
                                      <TableCell align="right" >{committee.begin_date}</TableCell>
                                      <TableCell align="right" >{committee.end_date}</TableCell>
                                    </TableRow>
                                  ))}
                                  {!role.subcommittees === true ? <></> : role.subcommittees.map((subcommittee, index) => (
                                    <TableRow key={index}>
                                      <TableCell component="th" scope="row" >
                                        {subcommittee.name}
                                      </TableCell>
                                      <TableCell align="right" >{subcommittee.code}</TableCell>
                                      <TableCell align="right" >{subcommittee.begin_date}</TableCell>
                                      <TableCell align="right" >{subcommittee.end_date}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                    </Paper>
                  )
                  )}
                </Grid>
              </div>
            </Grid>
          }
        </Container>
      </div >
    );
  }
}



Profile.propTypes = {
  // members: PropTypes.array.isRequired,
  // errors: PropTypes.any.isRequired,
  classes: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { fetchProfile })
);

export default enhance(Profile)
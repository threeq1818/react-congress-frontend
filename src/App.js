import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import './App.css';
import Banner from './components/Banner'
import Members from './components/Members';
import Profile from './components/Profile';
import store from './store';

// you should feel free to reorganize the code however you see fit
// including creating additional folders/files and organizing your
// components however you would like.

const theme = createMuiTheme({
});

class App extends Component {
  componentWillMount() {
    // const session = 115 // 115th congressional session
    // const chamber = 'senate' // or 'house'

    // // sample API call
    // fetch(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
    //   headers: new Headers({
    //     'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => json.results[0].members)
    //   .then((members) => {
    //     console.log(members);
    //     // array of congressperson JSON objects
    //   })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Banner />
          <Router>
            <Switch>
              <Route exact path="/members/search" component={Members} />
              <Route exact path="/members/profile" component={Profile} />
              <Route exact path="/">
                <Redirect to="/members/search" />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider >
    );
  }
}

export default App;

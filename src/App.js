import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import './App.css';
import Banner from './components/Banner'
import Members from './components/Members';
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
    //     // array of congressperson JSON objects
    //   })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Banner />
          <Router>
            <Route exact path="/" component={Members} />
          </Router>
        </Provider>
      </ThemeProvider >
    );
  }
}

export default App;

// actions/members.js

import { READ_MEMBERS_REQUEST, READ_MEMBERS_SUCCESS, READ_MEMBERS_FAILED, READ_PROFILE_REQUEST, READ_PROFILE_SUCCESS, READ_PROFILE_FAILED } from './types';
import { isEmpty } from '../validation/is-empty'
import { RELOAD_INTERVAL, API_HOST, API_KEY } from '../config';

const fetchMembers = (data) => {
  // debugger
  const session = isEmpty(data.session) ? 116 : data.session; // 116th congressional session
  const chamber = isEmpty(data.chamber) ? 'senate' : data.chamber; // or 'house'
  // axios.defaults.headers.common['X-API-Key'] = 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr';

  // localStorage
  let curDate = Date.now();
  const record_name = `members_${session}_${chamber.toLowerCase()}`;
  if (record_name in localStorage) {
    const data = JSON.parse(localStorage[record_name]);
    // console.log(curDate - data.update);
    if (curDate - data.update < 1000 * 60 * RELOAD_INTERVAL) {
      // console.log('from localStorage');
      return new Promise((resolve, reject) => {
        resolve({ payload: data.payload })
      });
    }
  }

  return fetch(`${API_HOST}/v1/${session}/${chamber}/members.json`, {
    headers: new Headers({
      'X-API-Key': API_KEY,
    }),
  })
    .then(res => {
      // debugger
      // console.log('from server');
      return res.json();
    })
    .then(json => {
      curDate = Date.now();
      localStorage.setItem(record_name, JSON.stringify({ update: curDate, payload: json.results[0].members }));
      return { payload: json.results[0].members };
    })
  // .then(res => res.json())
  // .then(json => json.results[0])
  // .then(results => ({
  //   payload: results
  // })
  // )
}
export const fetchProfile = (data) => dispatch => {
  const member_id = isEmpty(data.member_id) ? 0 : data.member_id;

  dispatch({
    type: READ_PROFILE_REQUEST
  });


  // localStorage
  let curDate = Date.now();
  const profile_name = `profile_${member_id.toLowerCase()}`;
  if (profile_name in localStorage) {
    const profile = JSON.parse(localStorage[profile_name]);
    // console.log(curDate - profile.update);
    if (curDate - profile.update < 1000 * 60 * RELOAD_INTERVAL) {
      // console.log('from localStorage');
      dispatch({
        type: READ_PROFILE_SUCCESS,
        payload: profile.payload
      });
      return;
    }
  }

  fetch(`${API_HOST}/v1/members/${member_id}.json`, {
    headers: new Headers({
      'X-API-Key': API_KEY,
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      if (json.status.toUpperCase() === 'OK') {
        curDate = Date.now();
        localStorage.setItem(profile_name, JSON.stringify({ update: curDate, payload: json.results[0] }));
        dispatch({
          type: READ_PROFILE_SUCCESS,
          payload: json.results[0]
        });
      }
      else
        dispatch({
          type: READ_PROFILE_FAILED,
          payload: json.errors.error
        })
    })
    .catch(err => {
      // debugger
      dispatch({
        type: READ_PROFILE_FAILED,
        payload: err.message
      })
    })

}

export const searchMembers = (data) => dispatch => {
  // debugger
  const sessions = isEmpty(data.sessions) ? [116] : data.sessions;  //congressional sessions array, []: all
  const chamber = isEmpty(data.chamber) ? ['senate'] : data.chamber; //chamber array
  // const searchField = isEmpty(data.searchFiled) ? ['both'] : data.searchField; //search field array
  const searchValue = isEmpty(data.searchValue) ? '' : data.searchValue;  //search value
  const party = isEmpty(data.party) ? [] : [...data.party];  //parties array, []: all ex: ['R','D','I', 'ID']  I:Independant Democrat, ID:Independant
  const yone = isEmpty(data.yone) ? [] : data.yone; //next election year, []: all year after now
  const gender = isEmpty(data.gender) ? [] : [...data.gender];  //gender, []: all, ex:['F', 'M']
  const total_votes = isEmpty(data.total_votes) ? { low: 0, high: 1500 } : data.total_votes;  // the range value of total value, 
  const votes_party_percentage = isEmpty(data.votes_party_percentage) ? { low: 0, high: 100 } : data.votes_party_percentage; // the range value of party percentage

  dispatch({
    type: READ_MEMBERS_REQUEST
  });

  for (let i = 0; i < party.length; i++) {
    if (party[i].toUpperCase() === 'DEMOCRATIC')
      party[i] = 'D';
    else if (party[i].toUpperCase() === 'REPUBLICAN')
      party[i] = 'R';
    else if (party[i].toUpperCase() === 'INDEPENDENT')
      party[i] = 'ID';
    else if (party[i].toUpperCase() === 'INDEPENDENT DEMOCRAT')
      party[i] = 'I';
  }
  for (let i = 0; i < gender.length; i++) {
    gender[i] = gender[i].substr(0, 1);
  }
  // debugger
  fetchMembers({ session: sessions[0], chamber: chamber[0] })
    .then(ret => {
      const results = ret.payload;
      // console.log(results.length);
      let filteredResults = results.filter(function (item) {
        let name = item.first_name + ' ' + item.middle_name + ' ' + item.last_name;
        name = name.trim();
        // debugger
        if (
          (searchValue !== '' ? name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 : true) &&
          (/*item.party === undefined || item.party === null ||*/ party.length === 0 ? true : party.includes(item.party.toUpperCase())) &&
          (/*item.next_election === undefined || item.next_election === null || */yone.length === 0 ? true : yone.includes(Number(item.next_election))) &&
          (/*item.gender === undefined || item.gender === null ||*/ gender.length === 0 ? true : gender.includes(item.gender.toUpperCase())) &&
          (item.total_votes === undefined || item.total_votes === null || (item.total_votes >= total_votes.low && (total_votes.high === 1500 ? true : item.total_votes <= total_votes.high))) &&
          (item.votes_with_party_pct === undefined || item.votes_with_party_pct === null || (item.votes_with_party_pct >= votes_party_percentage.low && item.votes_with_party_pct <= votes_party_percentage.high))
        )
          return true;
        else {
          return false;
        }
      });
      // console.log(filteredResults.length);
      dispatch({
        type: READ_MEMBERS_SUCCESS,
        payload: filteredResults
      });
    })
    .catch(err => {
      // debugger
      dispatch({
        type: READ_MEMBERS_FAILED,
        payload: err.message
      })
    })
}
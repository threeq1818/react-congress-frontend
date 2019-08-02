// actions/members.js

import axios from 'axios';
import { GET_ERRORS, READ_MEMBERS } from './types';
import { isEmpty } from '../validation/is-empty'

const fetchMembers = (data) => {
  const session = isEmpty(data.session) ? 116 : data.session; // 116th congressional session
  const chamber = isEmpty(data.chamber) ? 'senate' : data.chamber; // or 'house'

  return axios.get(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
    headers: new Headers({
      'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
    }),
  })
    .then(res => res.json())
    .then(json => json.results[0])
    .then(results => ({
      payload: results
    })
    )
}

export const searchMembers = (data) => dispatch => {
  const sessions = isEmpty(data.sessions) ? [] : data.sessions;  //congressional sessions array, []: all
  const chamber = isEmpty(data.chamber) ? ['house', 'senate'] : data.chamber; //chamber array
  // const searchField = isEmpty(data.searchFiled) ? ['both'] : data.searchField; //search field array
  const searchValue = isEmpty(data.searchValue) ? '' : data.searchValue;  //search value
  const party = isEmpty(data.party) ? [] : data.party;  //parties array, []: all ex: ['R','D','I']
  const nextElection = isEmpty(data.nextElection) ? [] : data.nextElection; //next election year, []: all year after now
  const gender = isEmpty(data.gender) ? [] : data.gender;  //gender, []: all, ex:['F', 'M']
  const total_votes = isEmpty(data.total_votes) ? { low: 0, high: 1500 } : data.total_votes;  // the range value of total value, 
  const votes_party_percentage = isEmpty(data.votes_party_percentage) ? { low: 0, high: 1500 } : data.votes_party_percentage; // the range value of party percentage

  fetchMembers({ data: { session: sessions[0], chamber: chamber[0] } })
    .then(ret => {
      const results = ret.payload;
      let filteredResults = results.filter(function (item) {
        const name = item.fist_name + ' ' + item.middle_name + ' ' + item.last_name;
        if ((searchValue !== '' ? name.indexOf(searchValue) >= 0 : true) &&
          (party.length !== 0 ? party.includes(item.party) : true) &&
          (nextElection.length !== 0 ? nextElection.includes(item.next_election) : true) &&
          (gender.length !== 0 ? gender.includes(item) : true) &&
          (item.total_votes >= total_votes.low && (total_votes.high === 1500 ? true : item.total_votes <= total_votes.high)) &&
          (item.votes_with_party_pct >= votes_party_percentage.low && item.votes_with_party_pct <= votes_party_percentage.high)
        )
          return true;
        else
          return false;
      });
      dispatch({
        type: READ_MEMBERS,
        payload: filteredResults
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
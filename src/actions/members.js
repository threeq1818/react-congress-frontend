// actions/members.js

import axios from 'axios';
import { GET_ERRORS, READ_MEMBERS } from './types';
import { isEmpty } from '../validation/is-empty'

export const fetchMembers = (data) => dispatch => {
  const session = isEmpty(data.session) ? 115 : data.session; // 115th congressional session
  const chamber = isEmpty(data.chamber) ? 'senate' : data.chamber; // or 'house'

  axios.get(`https://api.propublica.org/congress/v1/${session}/${chamber}/members.json`, {
    headers: new Headers({
      'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
    }),
  })
    .then(res => res.json())
    .then(json => json.results[0].members)
    .then(members => {
      dispatch({
        type: READ_MEMBERS,
        payload: members
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

}
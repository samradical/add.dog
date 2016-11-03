import { Record } from 'immutable';

/**
 * Record is like a class, but immutable and with default values.
 * https://facebook.github.io/immutable-js/docs/#/Record
 */
const InitialState = Record({
  projects: [],
});

const initialState = new InitialState;

/**
 * [projects description]
 * @param  {Record} state  =  initialState [An immutable Record defined above]
 * @param  {function} action [Redux action. Defined in '/actions/terms.js']
 * @return {Record} a new copy of the state you passed into with any changes to it
 */
export default function projects(state = initialState, action) {
  switch (action.type) {
    case "PROJECTS_ADD":
      {
        return state.set('projects', action.payload)
      }
    default:
      {
        return state;
      }
  }
}

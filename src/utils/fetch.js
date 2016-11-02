/* FOR BROWSER WITHOUT PROMISE SUPPORT */
require('es6-promise').polyfill();
/* END */
import isomorphicFetch from 'isomorphic-fetch';
import xhr from 'xhr-request';
const Q = require('bluebird')
const R = Q.promisify(xhr);


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function fetch(url, options = {}) {
  return isomorphicFetch(url, options)
    .then(checkStatus);
}

export function fetchJson(url) {
  return fetch(url)
    .then(response => {
      let _r = response.json()
      return _r;
    })
}

export function xhrJson(url, options = {}) {
  return R(url, Object.assign({}, { json: true }, options))
}

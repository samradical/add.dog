import './main.scss';

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import {
  RESIZE,
  ORIENTATION_CHANGE,
} from './constants/action-types';

import configureStore from './store/configure-store';
import configureRoutes from './routes/configure-routes';

import { xhrJson } from './utils/fetch';
import { forIn, assign } from 'lodash';
import RedisParser from '@samelie/tumblr-redis-parser';

import FastClick from 'fastclick';
FastClick.attach(document.body);

// Configure store and routes
const browserHistory = useRouterHistory(createHistory)({
  basename: process.env.APP_DOMAIN
});

const store = configureStore({
  browserHistory,
});
const histroy = syncHistoryWithStore(browserHistory, store);
const routes = configureRoutes();


window.addEventListener('resize', () => {
  store.dispatch({
    type: RESIZE,
    payload: { width: window.innerWidth, height: window.innerHeight }
  })
})

window.addEventListener("orientationchange", () => {
  store.dispatch({
    type: ORIENTATION_CHANGE,
    payload: window.orientation
  })
});

let _url = `${process.env.API_HOST}hget`
let _j = xhrJson(_url, {
    method: 'post',
    body: { key: 'tumblr:a3dddog:posts', }
  })
  .then(data => {
    let _parsed = RedisParser.posts(data)
    let _projects = RedisParser.getProjects(_parsed)
    console.log(_projects);
    store.dispatch({
      type: 'PROJECTS_ADD',
      payload: _projects
    })
  })

ReactDom.render(
  <Provider store={store}>
    <Router history={histroy}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app')
)

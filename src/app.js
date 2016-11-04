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
import { forIn, each, assign } from 'lodash';
//import RedisParser from '@samelie/tumblr-redis-parser';

import FastClick from 'fastclick';

const RedisParser = (() => {

  /*
    eg: title
  */
  //#class:<type>
  const _getClassType = (clazs) => {
    if (!clazs) {
      return ""
    } else {
      return clazs.split(":")[1]
    }
  }


  const _extractProjectName = (tag => (tag.split(":")[0]))
  const _extractProjectPage = (tag => (tag.split(":")[1]))
  const _extractProjectOrder = (tag => (parseInt(tag.split(":")[2], 10)))

  function posts(redisReponse) {
    //type: text, video, image...
    let parsed = {}
    Object.keys(redisReponse).forEach(type => {
      parsed[type] = JSON.parse(redisReponse[type])
    })
    return parsed
  }

  function getProjects(parsedData) {
    let _projects = {}
    forIn(parsedData, (postType, key) => {
      //latest should be at the bottom, can specify order

      each(postType, post => {

        //only first tag, page info here
        let _idTag = post.tags[0]
          //class info
        let _className = _getClassType(post.tags[1])
        post.className = _className

        if (_idTag) {

          let _name = _extractProjectName(_idTag)
          let _page = _extractProjectPage(_idTag)
          let _order = _extractProjectOrder(_idTag)
            /*
      order doesnt work
          */


          _projects[_name] = _projects[_name] || {}
          _projects[_name][_page] = _projects[_name][_page] || []

          //end
          _order = isNaN(_order) ?  (_projects[_name][_page].length + 999) : _order
          post.myOrder = _order
          _projects[_name][_page].push(post)
          _projects[_name][_page] = _projects[_name][_page]
            .sort((p1, p2) => {
              return p1.myOrder - p2.myOrder
            })
          //_projects[_name][_page][_order] = post
          //_projects[_name][_page].splice(_order, 0, post)
        }
      })
    })

    return _projects
  }




  return {
    posts: posts,
    getProjects: getProjects
  }

})()


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

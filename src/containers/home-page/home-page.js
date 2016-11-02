import './home-page.scss';

import React, { Component, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchJson, xhrJson } from '../../utils/fetch';

import { forIn } from 'lodash';

import Project from './project';
import ReactHtmlParser from 'react-html-parser';

import RedisParser from '@samelie/tumblr-redis-parser';

class HomePage extends Component {

  static propTypes = {
    browser: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      copy: null,
      projects: []
    }
  }

  componentDidMount() {
    let _url = `${process.env.API_HOST}hget`
    let _j = xhrJson(_url, {
        method: 'post',
        body: { key: 'tumblr:a3dddog:posts', }
      })
      .then(data => {
        let _parsed = RedisParser.posts(data)
        let _projects = RedisParser.getProjects(_parsed)
        console.log(_projects);
        //let json  = JSON.parse(data)
        let _covers = []

        forIn(_projects, (projectData, name) => {
          _covers.push(Project(projectData['home']))
        })

        this.setState({
          projects: _covers
        })
      })

    /*let _url2 = `${process.env.REMOTE_ASSETS_DIR}copy.json?z=${Math.random()}`
    let _j2 = fetchJson(_url2).then(data => {
      this.setState({
        copy: data
      })
    })*/

  }

  render() {
    const { browser } = this.props;
    const { copy } = this.state;
    if (!copy) {
      return (<div></div>)
    }
    return (
      <div className="o-page">
        <div className="o-page home">
        </div>
      </div>
    );
  }
}


export default connect(({ browser }) => ({
  browser,
}))(HomePage);

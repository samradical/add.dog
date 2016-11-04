import './project-page.scss';

import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';

import React, { Component, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment'

import { forIn, each, assign } from 'lodash';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchJson } from '../../utils/fetch';

import Post from './post';
import ReactHtmlParser from 'react-html-parser';

class ProjectPage extends Component {

  static propTypes = {
    browser: PropTypes.object.isRequired
  };

  static childContextTypes = {
    projectName: React.PropTypes.string
  };

  constructor(props) {
    super(props)
    this.state = {
      posts: null,
      projectName: props.params.id,
      bgImageStyle: {
        //background: `url(${process.env.REMOTE_ASSETS_DIR}images/dog.jpg) no-repeat center center fixed`,
      }
    }
  }

  getChildContext() {
    return {
      projectName: this.props.params.id
    }
  }

  componentDidMount() {
    this._generatePage(this.props)
  }

  componentWillReceiveProps(props) {
    this._generatePage(props)
  }

  _generatePage(props) {
    const { projects } = props.projects;

    const { projectName } = this.state
    if(!projects[projectName]){
      return
    }
    const _posts = projects[projectName].projects
    let _covers = []

    each(_posts, (post) => {

      let _props = assign({},
          post, {
            projectName: projectName
          })
        //home page tag, first post
      _covers.push(Post(_props))
    })
    this.setState({
      posts: _covers
    })
  }

  render() {
    const { browser, params } = this.props;
    return (
      <div ref="projects" style={this.state.bgImageStyle}
      className="o-page projects">
        {this.state.posts}
      </div>
    );
  }
}


export default connect(({ browser, projects, app }) => ({
  projects,
  browser,
  app
}))(ProjectPage);

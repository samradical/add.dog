import './home-page.scss';

import React, { Component, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment'

import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { fetchJson, xhrJson } from '../../utils/fetch';
import { add } from '../../actions/projects';
import { forIn, assign } from 'lodash';

import Project from './project';
import ReactHtmlParser from 'react-html-parser';

const mapDispatchToProps = dispatch => {
  return {
    add: add,
    onNavigateTo(dest) {
      dispatch(push(dest));
    }
  };
};

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

  _generatePage(props) {
   const { projects } = props;
    let _covers = []
    let _onClick = this.onProjectClick

    forIn(projects.projects, (projectData, name) => {
      console.log(projectData);
      let _props = assign({},
          projectData['home'][0], {
            onClick: _onClick,
            projectName: name
          })
        //home page tag, first post
      _covers.push(Project(_props))
    })

    this.setState({
      projects: _covers
    })
  }


  componentWillReceiveProps(props) {
    this._generatePage(props)
  }

  componentDidMount() {
    this.onProjectClick = this._onProjectClick.bind(this)
    this._generatePage(this.props)
  }

  _onProjectClick(projectProps) {
    const { onNavigateTo } = this.props;
    const { projectName } = projectProps
    const path = `/projects/${projectName}`
    onNavigateTo(path)
  }

  render() {
    const { browser } = this.props;
    const { copy } = this.state;
    return (
      <div className="o-page">
        <div className="o-page home">
          <div className="home__adddog">
            <h1 className="home__title"><i>ADddog</i></h1>
            <p className="home__text home__title--sub">Digital data transformations.</p>
          </div>
          {this.state.projects}
        </div>
      </div>
    );
  }
}


export default connect(({ browser, projects }) => ({
  browser,
  projects,
}), mapDispatchToProps)(HomePage);

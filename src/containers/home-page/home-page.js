import './home-page.scss';

import React, { Component, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment'

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchJson } from '../../utils/fetch';

import Project from './project';
import Effects from './effects';
import ReactHtmlParser from 'react-html-parser';

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
    let _url = `${process.env.REMOTE_ASSETS_DIR}projects.json?z=${Math.random()}`
    let _j = fetchJson(_url).then(data => {

      this.setState({
        projects: data.map(project => {
          console.log(project);
          return Project(project)
        })
      })
    })

    let _url2 = `${process.env.REMOTE_ASSETS_DIR}copy.json?z=${Math.random()}`
    let _j2 = fetchJson(_url2).then(data => {
      this.setState({
        copy: data
      })
      if(Detector.IS_DESKTOP){
        this._renderEffects()

        window.addEventListener('mousemove', (e)=>{
          let w = window.innerWidth
          let h = window.innerWidth
          let _x = e.pageX / w
          let _y = e.pageY / h

          if(this._effects){
            this._effects.changeValue('uMixRatio', _x * 0.5 + 0.5)
            this._effects.changeValue('uSaturationMix', (_y * 0.5 + 0.5) * 3)
          }
        })
      }
    })

  }

  _renderEffects() {
    setTimeout(()=>{
      this._effects = new Effects(
        this.refs.gl,
        this.refs.output,
        this.refs.vid2,
        this.refs.vid1, {
          width: 320,
          height: 240,
          fullscreen: false
        })
    },2000)
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
          <video ref="vid1" crossOrigin="anonymous" loop="true" muted="true" autoPlay="true" className="home__video" src={`${process.env.REMOTE_ASSETS_DIR}666untitled.mp4?z=${Math.random()}`}></video>
          <video ref="vid2" crossOrigin="anonymous" loop="true" muted="true" autoPlay="true" className="home__video" src={`${process.env.REMOTE_ASSETS_DIR}jaques.mp4?z=${Math.random()}`}></video>
          <canvas className="o-page home__canvas" ref="output"></canvas>
          <canvas className="o-page home__canvas" ref="gl"></canvas>
          <h1 className="home__title">{copy.pages.home.title}</h1>
          <p className="home__desc">{ReactHtmlParser(copy.pages.home.titleDesc)}</p>
          <div className="o-page projects">
            {this.state.projects}
          </div>
        </div>
      </div>
    );
  }
}


export default connect(({ browser }) => ({
  browser,
}))(HomePage);

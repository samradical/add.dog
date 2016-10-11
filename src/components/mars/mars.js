import './mars.scss';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { connect } from 'react-redux';
import alfrid from './experience/lib/alfrid';
const GL = alfrid.GL;
import SceneApp from './experience/SceneManager';

class Mars extends Component {

  componentDidMount() {
    const { browser } = this.props;
    GL.init(this.refs.glCtx)
    this.scene = new SceneApp();
    this.scene.on('loaded', ()=>{
      this.refs.loading.classList.add('is-hidden')
    })
  }

  componentWillReceiveProps(nextProps) {
    const { browser } = this.props;
  }

  render() {
    const { browser } = this.props;
    return (
      <div ref="mars-exp" className="o-page mars-exp">
        <div ref="loading" className="mars-loading">
          <span >LOADING</span>
        </div>
        <canvas ref="glCtx"></canvas>
      </div>
    );
  }
}

export default connect(({ browser }) => ({
  browser,
}), {})(Mars);

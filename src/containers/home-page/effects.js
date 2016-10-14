import _ from 'lodash'
import VideoEffects from '@samelie/video-effects'
let _o = {
  texture: {
    type: 'uniform1i',
    value: 0
  },
  texture2: {
    type: 'uniform1i',
    value: 1
  },
  uMixRatio: {
    type: 'float',
    value: 0.3
  },
  uBrightness: {
    type: 'float',
    value: -0.5
  },
  uSaturationKey: {
    type: 'float',
    value: 1.01
  },
  uSaturationMix: {
    type: 'float',
    value: 1.01
  },
  uContrast: {
    type: 'float',
    value: 0.01
  },
  uKeyVideoIndex: {
    type: 'int',
    value: 0
  }
}


export default class DeuxEffects {

  constructor(glCanvas,targetEl, source1, source2, options = { width: 640, height: 360, fullscreen: true }) {
    let videoEffects = new VideoEffects(
      glCanvas,
      targetEl,
      source1,
      source2,
      options
    )
    let _uniforms = videoEffects.setUniforms(_o)
    this._uniforms = _uniforms

    let _guiC = {
      uMixRatio: _o.uMixRatio.value,
      uBrightness: _o.uBrightness.value,
      uSaturationKey: _o.uSaturationKey.value,
      uSaturationMix: _o.uSaturationMix.value,
      uContrast: _o.uContrast.value,
      uKeyVideoIndex: _o.uKeyVideoIndex.value,
    }
  }

  addSource(options) {}

  changeValue(key, val){
    this._uniforms[key] = val
  }

  start() {}

}

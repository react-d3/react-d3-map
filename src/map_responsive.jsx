"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as Map
} from './map';

import {
  MercatorMobileMap
} from 'react-d3-map-mobile';

export default class MapResponsive extends Component {
  constructor(props) {
    super(props)
  }

  static childContextTypes = {
    mobile: React.PropTypes.bool
  }

  getChildContext () {
    var mobile;

    const {
      width
    } = this.props;

    mobile = width < 768? true: false;

    return {
      mobile: mobile
    }
  }

  render() {
    const {
      width,
      height,
      scale,
      center
    } = this.props;

    var {
      controllerScale
    } = this.props;

    var chart;

    if(!controllerScale) controllerScale = scale / (1 << 4);

    if(width < 768) {
      // small device
      chart = (
        <MercatorMobileMap
          {...this.props}
          width= {width}
          height= {height}
          scale= {scale}
          controllerScale= {controllerScale}
          center= {center}
        >
          {this.props.children}
        </MercatorMobileMap>
      )
    } else {
      // else device
      chart = (
        <Map
          {...this.props}
          width= {width}
          height= {height}
          scale= {scale}
          center= {center}
        >
          {this.props.children}
        </Map>
      )
    }

    return chart;
  }
}

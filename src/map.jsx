"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  Chart,
  projection as projectionFunc,
  geoPath,
  tileFunc
} from 'react-d3-map-core';

import {
  default as CommonProps,
} from './commonProps';

import {
  default as Vector
} from './vector';

export default class Map extends Component {
  constructor(props) {
    super(props);

    const {
      scale
    } = this.props;

    this.state = {
      zoomTranslate: null,
      scaleSet: scale
    };
  }

  static defaultProps = CommonProps

  static childContextTypes = {
    geoPath: React.PropTypes.func.isRequired,
    projection: React.PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      geoPath: this.geoPath,
      projection: this.projection
    };
  }

  onZoom(onZoomScale, onZoomTranslate) {
    this.setState({
      scaleSet: onZoomScale,
      zoomTranslate: onZoomTranslate
    })
  }

  render() {
    const {
      scaleSet,
      zoomTranslate
    } = this.state;

    const {
      width,
      height,
      center,
      projection,
      simplify,
      simplifyArea,
      clip,
      bounds,
      data,
      popupContent,
      scale
    } = this.props;

    var zoomScale = this.props.zoomScale || scale;
    var times = zoomScale / scale;

    var onZoom = this.onZoom.bind(this);

    var translate = [width / 2, height / 2] || this.props.translate;

    var proj = projectionFunc({
      projection: projection,
      scale: (scaleSet * times) / 2 / Math.PI,
      translate: zoomTranslate || translate,
      center: center,
      simplify: simplify,
      simplifyArea: simplifyArea,
      clip: clip,
      bounds: bounds
    });

    var geo = geoPath(proj);

    this.projection = proj;
    this.geoPath = geo;

    var tiles = tileFunc({
      scale: proj.scale() * 2 * Math.PI,
      translate: proj([0, 0]),
      size: ([width, height])
    });

    return (
      <Chart
        {...this.props}
        width= {width}
        height= {height}
        projection = {proj}
        onZoom= {onZoom}
        center= {center}
      >
        <Vector
          {...this.props}
          {...this.state}
          tiles= {tiles}
          data= {data}
        >
          {this.props.children}
        </Vector>
      </Chart>
    )

  }
}

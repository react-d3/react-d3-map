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
  tileFunc,
  ZoomControl
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

    this.state = {
      zoomTranslate: null,
      scale: this.props.scale,
      times: 1,
      zoomStart: false
    };
  }

  static defaultProps = CommonProps

  onZoom(zoomScale, zoomTranslate) {
    var times = this.state.times;

    this.setState({
      scale: zoomScale * times,
      zoomTranslate: zoomTranslate
    })
  }

  onZoomStart(zoomScale, zoomTranslate) {
    this.setState({
      zoomStart: true
    })
  }

  onZoomEnd(zoomScale, zoomTranslate) {
    this.setState({
      zoomStart: false
    })
  }

  zoomIn() {
    var times = this.state.times;

    this.setState({
      times: times * 2,
      scale: this.state.scale * 2
    })
  }

  zoomOut() {
    var times = this.state.times;

    this.setState({
      times: times / 2,
      scale: this.state.scale / 2
    })
  }

  render() {
    const {
      scale,
      zoomTranslate
    } = this.state;

    const {
      width,
      height,
      center,
      projection,
      data,
      popupContent
    } = this.props;

    var onZoom = this.onZoom.bind(this);
    var zoomIn = this.zoomIn.bind(this);
    var zoomOut = this.zoomOut.bind(this);
    var onZoomStart = this.onZoomStart.bind(this);
    var onZoomEnd = this.onZoomEnd.bind(this);

    var translate = [width / 2, height / 2] || this.props.translate;

    var proj = projectionFunc({
      projection: projection,
      scale: scale / 2 / Math.PI,
      translate: zoomTranslate || translate,
      center: center
    });

    var geo = geoPath(proj);

    var tiles = tileFunc({
      scale: proj.scale() * 2 * Math.PI,
      translate: proj([0, 0]),
      size: ([width, height])
    });

    console.log(tiles)

    var styleContainer = {
      position: 'relative',
      backgroundColor: '#EEE',
      width: width
    }

    return (
      <div style= {styleContainer}>
        <Chart
          {...this.props}
          width= {width}
          height= {height}
          projection = {proj}
          onZoom= {onZoom}
          onZoomStart= {onZoomStart}
          onZoomEnd= {onZoomEnd}
          center= {center}
        >
          <Vector
            tiles= {tiles}
            projection= {proj}
            geoPath= {geo}
            data= {data}
            width= {width}
            height= {height}
            popupContent= {popupContent}
            {...this.state}
          />
        </Chart>
        <ZoomControl
          zoomInClick= {zoomIn}
          zoomOutClick= {zoomOut}
        />
      </div>
    )

  }
}

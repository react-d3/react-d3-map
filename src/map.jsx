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
  Popup
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
      xPopup: null,
      yPopup: null,
      contentPopup: null,
      zoomTranslate: null,
      zoomScale: null
    };
  }

  static defaultProps = CommonProps

  onClick(dom, d, x, y) {
    this.setState({
      xPopup: x,
      yPopup: y,
      contentPopup: d.properties.name
    })
  }

  onZoom(zoomScale, zoomTranslate) {
    this.setState({
      zoomScale: zoomScale,
      zoomTranslate: zoomTranslate
    })
  }

  render() {
    const {
      zoomScale,
      zoomTranslate
    } = this.state;

    const {
      width,
      height,
      scale,
      center,
      projection,
      data
    } = this.props;

    var onClick = this.onClick.bind(this);
    var onZoom = this.onZoom.bind(this);

    var translate = [width / 2, height / 2] || this.props.translate;

    var proj = projectionFunc({
      projection: projection,
      scale: zoomScale? (zoomScale / 2 / Math.PI): scale,
      translate: zoomTranslate || translate,
      center: center
    });

    var geo = geoPath(proj);

    var tiles = tileFunc({
      scale: proj.scale() * 2 * Math.PI,
      translate: proj([0, 0]),
      size: ([width, height])
    });

    var popup = (<Popup
      {...this.state}
    />);

    return (
      <div>
        <Chart
          width= {width}
          height= {height}
          projection = {proj}
          onZoom= {onZoom}
          center= {center}
          {...this.state}
        >
          <Vector
            tiles= {tiles}
            projection= {proj}
            geoPath= {geo}
            onClick= {onClick}
            data= {data}
            {...this.state}
          />
        </Chart>
        {popup}
      </div>
    )

  }
}

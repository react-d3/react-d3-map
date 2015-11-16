"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  Tile,
  Polygon
} from 'react-d3-map-core';

export default class Vector extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    const {
      tiles,
      data,
      geoPath,
      onClick
    } = this.props

    return (
      <g>
        <Tile
          tiles= {tiles}
        />
        <Polygon
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
          {...this.props}
        />
      </g>
    )
  }
}

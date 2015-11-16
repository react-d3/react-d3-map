"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  Tile
} from 'react-d3-map-core';

import {
  default as PolygonGroup
} from './polygonGroup'

export default class Vector extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    const {
      tiles,
      data,
      geoPath,
      projection
    } = this.props

    // seperate data to polygon, line, point and sent to different groups

    return (
      <g>
        <Tile
          tiles= {tiles}
        />
        <PolygonGroup
          data= {data}
          geoPath= {geoPath}
          projection= {projection}
        />
      </g>
    )
  }
}

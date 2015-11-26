"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  Tile
} from 'react-d3-map-core';

export default class Vector extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    const {
      tiles
    } = this.props;

    return (
      <g>
        <Tile
          scale= {tiles.scale}
          translate= {tiles.translate}
          tiles= {tiles}
        />
        {this.props.children}
      </g>
    )
  }
}

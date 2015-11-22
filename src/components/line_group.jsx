"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Mesh
} from 'react-d3-map-core';

export default class MeshGroup extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.showPopup.size
      !== this.props.showPopup.size) {
      return false;
    }else {
      return true;
    }
  }

  render() {
    const {
      data,
      geoPath,
      onClick
    } = this.props;

    var polygons;

    if(data && data !== []) {
      if(Array.isArray(data)) {
        polygons = data.map((d, i) => {
          return (
            <Mesh
              id= {d.properties.react_d3_map__id}
              key= {i}
              data= {d}
              geoPath= {geoPath}
              onClick= {onClick}
            />
          )
        })
      }else {
        polygons = (<Mesh
          id= {data.properties.react_d3_map__id}
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
        />)
      }
    }

    return (
      <g>
        {polygons}
      </g>
    )
  }
}

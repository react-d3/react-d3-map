"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Polygon
} from 'react-d3-map-core';

export default class PolygonGroup extends Component {
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
      onClick,
      onMouseOver,
      onMouseOut
    } = this.props;

    var polygons;

    if(data && data !== []) {
      if(Array.isArray(data)) {
        polygons = data.map((d, i) => {
          return (
            <Polygon
              id= {d.properties.react_d3_map__id}
              key= {i}
              data= {d}
              geoPath= {geoPath}
              onClick= {onClick}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
            />
          )
        })
      }else {
        polygons = (<Polygon
          id= {data.properties.react_d3_map__id}
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
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

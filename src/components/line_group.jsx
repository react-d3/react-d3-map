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
      onClick,
      onMouseOver,
      onMouseOut
    } = this.props;

    var meshs;

    if(data && data !== []) {
      if(Array.isArray(data)) {
        meshs = data.map((d, i) => {
          return (
            <Mesh
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
        meshs = (<Mesh
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
        {meshs}
      </g>
    )
  }
}

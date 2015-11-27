"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Mesh
} from 'react-d3-map-core';

export default class MeshCollection extends Component {
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
      onMouseOut,
      meshClass
    } = this.props;

    var meshs;

    if(data.type === 'FeatureCollection') {
      var lineData = [];

      // loop through features
      data.features.forEach(function(d) {
        lineData.push(d);
      })
    }else if(data.type === 'Feature') {
      var lineData;

      lineData = data;
    }

    if(lineData) {
      if(Array.isArray(lineData)) {
        meshs = lineData.map((d, i) => {
          return (
            <Mesh
              id= {'react-d3-map__mesh' + i}
              key= {'react-d3-map__mesh' + i}
              data= {d}
              geoPath= {geoPath}
              onClick= {onClick}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
              meshClass= {meshClass}
            />
          )
        })
      }else {
        meshs = (<Mesh
          id= {'react-d3-map__mesh'}
          data= {lineData}
          geoPath= {geoPath}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          meshClass= {meshClass}
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

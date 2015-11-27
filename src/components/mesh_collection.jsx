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
    var lineData;

    if(data.type === 'FeatureCollection') {
      lineData = [];

      // loop through features
      data.features.forEach(function(d) {
        lineData.push(d);
      });

    }else if(data.type === 'Feature') {
      lineData = data;
    }

    if(lineData) {
      // if not array, make it as array
      if(!Array.isArray(lineData)) 
        lineData = [lineData];

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
    }

    return (
      <g>
        {meshs}
      </g>
    )
  }
}

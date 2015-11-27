"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Polygon
} from 'react-d3-map-core';

export default class PolygonCollection extends Component {
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
      polygonClass
    } = this.props;

    var polygons;

    if(data.type === 'FeatureCollection') {
      var polygonData = [];

      // loop through features
      data.features.forEach(function(d) {
        polygonData.push(d);
      })
    }else if(data.type === 'Feature') {
      var polygonData;

      polygonData = data;
    }

    if(polygonData) {
      if(Array.isArray(polygonData)) {
        polygons = polygonData.map((d, i) => {
          return (
            <Polygon
              id= {'react-d3-map__polygon' + i}
              key= {'react-d3-map__polygon' + i}
              data= {d}
              geoPath= {geoPath}
              onClick= {onClick}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
              polygonClass= {polygonClass}
            />
          )
        })
      }else {
        polygons = (<Polygon
          id= {'react-d3-map__polygon'}
          data= {polygonData}
          geoPath= {geoPath}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          polygonClass= {polygonClass}
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

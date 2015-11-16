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
    if(data.type === 'FeatureCollection') {
      var polygonData = [],
          lineData = [],
          pointData = [];

      // loop through features
      data.features.forEach(function(d) {
        if(d.geometry.type === 'Polygon' || d.geometry.type === 'MultiPolygon') {
          // polygon
          polygonData.push(d);
        }else if (d.geometry.type === 'LineString' || d.geometry.type === 'MultiLineString') {
          // line
          lineData.push(d);
        }else if (d.geometry.type === 'Point' || d.geometry.type === 'MultiPoint') {
          // point
          pointData.push(d);
        }
      })
    }else if(data.type === 'Feature') {
      var polygonData, lineData, pointData;

      if(data.geometry.type === 'Polygon' || data.geometry.type === 'MultiPolygon') {
        // polygon
        polygonData = data;
      }else if (data.geometry.type === 'LineString' || data.geometry.type === 'MultiLineString') {
        // line
        lineData = data;
      }else if (data.geometry.type === 'Point' || data.geometry.type === 'MultiPoint') {
        // point
        pointData = data;
      }
    }

    return (
      <g>
        <Tile
          tiles= {tiles}
        />
        <PolygonGroup
          data= {polygonData}
          geoPath= {geoPath}
          projection= {projection}
        />
      </g>
    )
  }
}

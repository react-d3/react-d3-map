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
  default as PolygonPopupGroup
} from './PolygonPopupGroup'

import {
  default as MarkerPopupGroup
} from './MarkerPopupGroup'

import {
  default as LinePopupGroup
} from './LinePopupGroup'

export default class Vector extends Component {
  constructor(props) {
    super (props);

    const {
      data
    } = this.props;

    // seperate data to polygon, line, point and sent to different groups
    if(data.type === 'FeatureCollection') {
      var polygonData = [],
          lineData = [],
          pointData = [];

      // loop through features
      data.features.forEach(function(d) {
        d.properties.react_d3_map__id = Math.floor(Math.random() * 100000)
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

      data.properties.react_d3_map__id = Math.floor(Math.random() * 100000)
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

    this.state = {
      polygonData: polygonData,
      lineData: lineData,
      pointData: pointData
    }
  }

  render() {
    const {
      tiles,
      data,
      geoPath,
      projection
    } = this.props

    const {
      polygonData,
      lineData,
      pointData
    } = this.state;

    return (
      <g>
        <Tile
          tiles= {tiles}
        />
        <PolygonPopupGroup
          data= {polygonData}
          geoPath= {geoPath}
          projection= {projection}
        />
        <LinePopupGroup
          data= {lineData}
          geoPath= {geoPath}
          projection= {projection}
        />
        <MarkerPopupGroup
          data= {pointData}
          geoPath= {geoPath}
          projection= {projection}
        />
      </g>
    )
  }
}

"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactDOM
} from 'react-dom';

import {
  default as ReactFauxDOM
} from 'react-faux-dom';

import {
  Tile,
  tileFunc
} from 'react-d3-map-core';

import {
  default as TileOverlay
} from './components/tileOverlay'

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

  componentWillUpdate(nextProps, nextState) {
    var tiles = ReactDOM.findDOMNode(this.refs.tiles)
    var zoomStart = nextProps.zoomStart;
    var nowZoomStart = this.props.zoomStart;

    if(zoomStart === true && zoomStart !== nowZoomStart) {
      this.overlay = tiles.children[0].cloneNode(true);
    }else if (zoomStart === false) {
      // clear overlay
      var overlay = ReactDOM.findDOMNode(this.refs.tilesOverlay);
      while (overlay.firstChild) {
        overlay.removeChild(overlay.firstChild);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var overlay = ReactDOM.findDOMNode(this.refs.tilesOverlay)
    var tiles = ReactDOM.findDOMNode(this.refs.tiles)
    var prevZoomStart = prevProps.zoomStart;
    var nowZoomStart = this.props.zoomStart;

    if(nowZoomStart === true && prevZoomStart !== nowZoomStart) {
      overlay.appendChild(this.overlay);
    }
  }

  render() {
    const {
      width,
      height,
      tiles,
      data,
      geoPath,
      projection,
      popupContent,
      startTiles,
      zoomStart
    } = this.props

    const {
      polygonData,
      lineData,
      pointData
    } = this.state;

    var transform = "scale(" + tiles.scale + ")translate(" + tiles.translate + ")";
    var overlayStyle = {
      willChange: 'transform'
    }

    return (
      <g>
        <Tile
          ref= 'tiles'
          scale= {tiles.scale}
          translate= {tiles.translate}
          tiles= {tiles}
        />
        <g
          ref= 'tilesOverlay'
          transform= {transform}
          style= {overlayStyle}
          >
        </g>
        <PolygonPopupGroup
          data= {polygonData}
          geoPath= {geoPath}
          projection= {projection}
          popupContent= {popupContent}
        />
        <LinePopupGroup
          data= {lineData}
          geoPath= {geoPath}
          projection= {projection}
          popupContent= {popupContent}
        />
        <MarkerPopupGroup
          data= {pointData}
          geoPath= {geoPath}
          projection= {projection}
          popupContent= {popupContent}
        />
      </g>
    )
  }
}

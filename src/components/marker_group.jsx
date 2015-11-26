"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Marker
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
      projection,
      onClick,
      onMouseOver,
      onMouseOut,
      markerClass
    } = this.props;

    var markers;

    if(data.type === 'FeatureCollection') {
      var pointData = [];

      // loop through features
      data.features.forEach(function(d) {
        pointData.push(d);
      })
    }else if(data.type === 'Feature') {
      var pointData;

      pointData = data;
    }

    if(pointData) {
      if(Array.isArray(pointData)) {
        markers = pointData.map((d, i) => {
          var x = +projection(d.geometry.coordinates)[0];
          var y = +projection(d.geometry.coordinates)[1];
          var id = x + '-' + y;
          return (
            <Marker
              id= {id}
              key= {i}
              data= {d}
              x= {x}
              y= {y}
              onClick= {onClick}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
              markerClass= {markerClass}
            />
          )
        })
      }else {
        var x = +projection(d.geometry.coordinates)[0];
        var y = +projection(d.geometry.coordinates)[1];
        var id = x + '-' + y;
        markers = (<Marker
          id= {id}
          data= {pointData}
          x= {x}
          y= {y}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          markerClass= {markerClass}
        />)
      }
    }

    return (
      <g>
        {markers}
      </g>
    )
  }
}

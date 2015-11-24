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
      onMouseOut
    } = this.props;

    var markers;

    if(data && data !== []) {
      if(Array.isArray(data)) {
        markers = data.map((d, i) => {
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
            />
          )
        })
      }else {
        var x = +projection(d.geometry.coordinates)[0];
        var y = +projection(d.geometry.coordinates)[1];
        var id = x + '-' + y;
        markers = (<Marker
          id= {id}
          data= {data}
          x= {x}
          y= {y}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
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

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
          return (
            <Marker
              id= {d.properties.react_d3_map__id}
              key= {i}
              data= {d}
              x= {+projection(d.geometry.coordinates)[0]}
              y= {+projection(d.geometry.coordinates)[1]}
              onClick= {onClick}
              onMouseOver= {onMouseOver}
              onMouseOut= {onMouseOut}
            />
          )
        })
      }else {
        markers = (<Marker
          id= {data.properties.react_d3_map__id}
          data= {data}
          x= {+projection(data.geometry.coordinates)[0]}
          y= {+projection(data.geometry.coordinates)[1]}
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

"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as PolygonPopup
} from './components/polygonPopup'

export default class PolygonGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      data,
      geoPath,
      projection
    } = this.props;

    var polygons;

    if(data)
      if(Array.isArray(data)) {
        polygons = data.map((d) => {
          return (
            <PolygonPopup
              data= {d}
              geoPath= {geoPath}
              projection= {projection}
            />
          )
        })
      }else {
        polygons = (<PolygonPopup
          data= {data}
          geoPath= {geoPath}
          projection= {projection}
        />)
      }


    return (
      <g>
        {polygons}
      </g>
    )
  }
}

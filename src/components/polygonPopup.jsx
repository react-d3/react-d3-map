"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react'

import {
  Polygon,
  Popup
} from 'react-d3-map-core';

export default class PolygonPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    }
  }

  _onClick() {
    const {
      projection
    } = this.props;

    if(d3.event) {
      var position = projection.invert([d3.event.clientX, d3.event.clientY]);
    } else {
      var position = [-100, -100]
    }

    this.setState({
      xPopup: position[0],
      yPopup: position[1],
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const {
      data,
      geoPath,
      projection
    } = this.props;

    const {
      showPopup,
      xPopup,
      yPopup
    } = this.state;

    var onClick = this._onClick.bind(this)
    var popup;
    var content = "Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 33 KB of JS, it has all the mapping features most developers ever need.";

    if(showPopup) {
      var point = projection([xPopup, yPopup])

      popup = (
        <Popup
          x= {point[0]}
          y= {point[1]}
          contentPopup={content}
          closeClick= {onClick}
        />
      )
    }

    return (
      <g>
        <Polygon
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
        />
        {popup}
      </g>
    )
  }
}

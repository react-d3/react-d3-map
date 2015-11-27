"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  OrderedMap,
  Map
} from 'immutable'

import d3 from 'd3';

import {
  Popup
} from 'react-d3-map-core';

import {
  default as PolygonCollection
} from './components/polygon_collection'

export default class PolygonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: OrderedMap()
    }
  }

  _onClick(that, d, id) {

    var {
      showPopup
    } = this.state;

    const {
      projection,
      onClick
    } = this.props;

    if(onClick) onClick(that, d, id);

    if(showPopup.keySeq().toArray().indexOf(id) !== -1) {
      // hide popup
      var newPopup = showPopup.delete(id);
    } else {
      // add a popup
      var position = projection.invert([d3.event.clientX, d3.event.clientY]);

      var newPopup = showPopup.set(id, Map({
        xPopup: position[0],
        yPopup: position[1],
        data: d
      }));
    }

    this.setState({
      showPopup: newPopup
    })
  }

  _onCloseClick(id) {

    var {
      showPopup
    } = this.state;

    const {
      onCloseClick
    } = this.props;

    if(onCloseClick) onCloseClick(id);

    if(showPopup.keySeq().toArray().indexOf(id) !== -1) {
      // hide popup
      var newPopup = showPopup.delete(id);
    }

    this.setState({
      showPopup: newPopup
    })
  }

  render() {

    const {
      showPopup
    } = this.state;

    const {
      data,
      geoPath,
      projection,
      popupContent,
      onMouseOut,
      onMouseOver,
      polygonClass
    } = this.props;

    var onClick = this._onClick.bind(this)
    var popup;

    if(showPopup.size && popupContent) {
      popup = showPopup.keySeq().toArray().map((d, i) => {
        var xPopup = showPopup.get(d).get('xPopup');
        var yPopup = showPopup.get(d).get('yPopup');
        var popupData = showPopup.get(d).get('data');

        var point = projection([xPopup, yPopup])
        var content = popupContent(popupData);

        var onCloseClick = this._onCloseClick.bind(this, d)

        return  (
          <Popup
            key= {i}
            x= {point[0]}
            y= {point[1] - 10}
            contentPopup={content}
            closeClick= {onCloseClick}
          />
        )
      })

    }

    return (
      <g>
        <PolygonCollection
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          polygonClass= {polygonClass}
          {...this.state}
        />
        {popup}
      </g>
    )
  }
}

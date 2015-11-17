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

import {
  Popup
} from 'react-d3-map-core';

import {
  default as MarkerGroup
} from './components/markerGroup'

export default class PointPopupGroup extends Component {
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
      projection
    } = this.props;

    if(showPopup.keySeq().toArray().indexOf(id) !== -1) {
      // hide popup
      var newPopup = showPopup.delete(id);
    } else {
      // add a popup
      var newPopup = showPopup.set(id, Map({
        xPopup: d.geometry.coordinates[0],
        yPopup: d.geometry.coordinates[1],
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
      popupContent
    } = this.props;

    var onClick = this._onClick.bind(this)

    var popup;

    if(showPopup.size) {
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
            y= {point[1] - 50}
            contentPopup={content}
            closeClick= {onCloseClick}
          />
        )
      })

    }

    return (
      <g>
        <MarkerGroup
          data= {data}
          projection= {projection}
          onClick= {onClick}
          {...this.state}
        />
        {popup}
      </g>
    )
  }
}

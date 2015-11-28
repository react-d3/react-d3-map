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
  default as MarkerCollection
} from './components/marker_collection'

export default class PointGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: OrderedMap()
    }
  }

  static contextTypes = {
    geoPath: React.PropTypes.func.isRequired,
    projection: React.PropTypes.func.isRequired
  }

  _onClick(that, d, id) {

    var {
      showPopup
    } = this.state;

    const {
      onClick
    } = this.props;

    const {
      projection
    } = this.context;

    if(onClick) onClick(that, d, id);

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
      popupContent,
      onMouseOver,
      onMouseOut,
      markerClass
    } = this.props;

    const {
      geoPath,
      projection
    } = this.context;

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
            y= {point[1] - 50}
            contentPopup={content}
            closeClick= {onCloseClick}
          />
        )
      })

    }

    return (
      <g>
        <MarkerCollection
          data= {data}
          projection= {projection}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          markerClass= {markerClass}
          {...this.state}
        />
        {popup}
      </g>
    )
  }
}

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

  _onClick(dom, d, id) {
    const {
      onClick
    } = this.props;

    this.id = id;
    this.d = d;
    this.getDOM = dom;

    if(onClick) onClick(this, d, id);
  }

  _onMouseOut(dom, d, id) {
    const {
      onMouseOut
    } = this.props;

    this.id = id;
    this.d = d;
    this.getDOM = dom;

    if(onMouseOut) onMouseOut(this, d, id);
  }

  _onMouseOver(dom, d, id) {
    const {
      onMouseOver
    } = this.props;

    this.id = id;
    this.d = d;
    this.getDOM = dom;

    if(onMouseOver) onMouseOver(this, d, id);
  }

  _onCloseClick(id) {
    const {
      onCloseClick
    } = this.props;

    this.id = id;

    if(onCloseClick) onCloseClick(this, id);
  }

  showPopup() {
    var {
      showPopup
    } = this.state;

    var id = this.id;
    var d = this.d;

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

  hidePopup() {
    var {
      showPopup
    } = this.state;

    var id = this.id;

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
      markerClass
    } = this.props;

    const {
      geoPath,
      projection
    } = this.context;

    var onClick = this._onClick.bind(this);
    var onMouseOver = this._onMouseOver.bind(this);
    var onMouseOut = this._onMouseOut.bind(this);
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

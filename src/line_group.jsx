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
  default as LineCollection
} from './components/mesh_collection'

export default class LineGroup extends Component {
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

    const {
      projection
    } = this.context;

    var id = this.id;
    var d = this.d;

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
      meshClass
    } = this.props;

    const {
      geoPath,
      projection
    } = this.context;

    var onClick = this._onClick.bind(this)
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
            y= {point[1] - 10}
            contentPopup={content}
            closeClick= {onCloseClick}
          />
        )
      })

    }

    return (
      <g>
        <LineCollection
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
          onMouseOver= {onMouseOver}
          onMouseOut= {onMouseOut}
          meshClass= {meshClass}
          {...this.state}
        />
        {popup}
      </g>
    )
  }
}

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
  default as LineGroup
} from './components/lineGroup'

export default class LinePopupGroup extends Component {
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
      var position = projection.invert([d3.event.clientX, d3.event.clientY]);

      var newPopup = showPopup.set(id, Map({
        xPopup: position[0],
        yPopup: position[1]
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
      projection
    } = this.props;

    var onClick = this._onClick.bind(this)

    var content = "React-d3-map is awesome!";

    var popup;

    if(showPopup.size) {
      popup = showPopup.keySeq().toArray().map((d, i) => {
        var xPopup = showPopup.get(d).get('xPopup');
        var yPopup = showPopup.get(d).get('yPopup');

        var point = projection([xPopup, yPopup])

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
        <LineGroup
          data= {data}
          geoPath= {geoPath}
          onClick= {onClick}
          {...this.state}
        />
        {popup}
      </g>
    )
  }
}

"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as MarkerGroup
} from '../marker_group';

import {
  MarkerGroup as MobileMarkerGroup
} from 'react-d3-map-mobile'

export default class ResponsiveMarker extends Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    mobile: React.PropTypes.bool
  }

  render() {
    const {
      mobile
    } = this.context;

    const {
      popupContent
    } = this.props;

    var chart;

    if(mobile) {
      chart = (
        <MobileMarkerGroup
          {...this.props}
          overlayContent= {popupContent}
        />
      )
    }else {
      chart = (
        <MarkerGroup
          {...this.props}
        />
      )
    }

    return chart;
  }
}

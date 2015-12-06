"use strict"

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as PolygonGroup
} from '../polygon_group';

import {
  PolygonGroup as MobilePolygonGroup
} from 'react-d3-map-mobile'

export default class ResponsivePolygon extends Component {
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
        <MobilePolygonGroup
          {...this.props}
          overlayContent= {popupContent}
        />
      )
    }else {
      chart = (
        <PolygonGroup
          {...this.props}
        />
      )
    }

    return chart;
  }
}

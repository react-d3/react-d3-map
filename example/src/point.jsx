"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('../../lib/index').Map;
var MarkerGroup = require('../../lib/index').MarkerGroup;

var css= require('./css/polygon.css');

// Example
(function() {
  var width = 1000;
  var height = 800;
  var scale = 1200 * 5;
  var scaleExtent = [1 << 12, 1 << 13]
  var center = [-5, 55.4];
  var uk = require('json!../data/uk.json');
  var data = topojson.feature(uk, uk.objects.places);
  var popupContent = function(d) { return d.properties.name; }
  var onMarkerMouseOut= function(component, d, i) {
    component.hidePopup();
    // to get the dom
    var dom = ReactDOM.findDOMNode(component.domRef);
  }
  var onMarkerMouseOver= function(component, d, i) {
    component.showPopup();
    // console.log(component.getDOM)
  }
  var onMarkerClick= function(component, d, id) {
    console.log('click')
    // component.showPopup();
  }
  var onMarkerCloseClick= function(component, id) {
    console.log('close click')
    // component.hidePopup();
  }


  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      scaleExtent= {scaleExtent}
      center= {center}
    >
      <MarkerGroup
        key= {"polygon-test"}
        data= {data}
        popupContent= {popupContent}
        onClick= {onMarkerClick}
        onCloseClick= {onMarkerCloseClick}
        onMouseOver= {onMarkerMouseOver}
        onMouseOut= {onMarkerMouseOut}
        markerClass= {"your-marker-css-class"}
      />
    </Map>
  , document.getElementById('blank-point')
  )

})()

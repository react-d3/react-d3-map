"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('../../lib/index').Map;

var css= require('./css/polygon.css');

// Example
(function() {
  var width = 1000;
  var height = 800;
  var scale = 1 << 12;
  var scaleExtent = [1 << 10, 1 << 14]
  var center = [-100.95, 40.7];
  var data = require('json!../data/states.json');
  var popupContent = function(d) { return 'hi, this is id: ' + d.properties.react_d3_map__id + ' polygon.'; }
  var onPolygonMouseOut= function(dom , d, i) {
    console.log('out')
  }
  var onPolygonMouseOver= function(dom, d, i) {
    console.log('over')
  }
  var onPolygonClick= function(dom, d, i) {
    console.log('click')
  }
  var onPolygonCloseClick= function(id) {
    console.log('close click')
    console.log(id)
  }


  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      scaleExtent= {scaleExtent}
      center= {center}
      data= {data}
      popupContent= {popupContent}
      onPolygonMouseOut= {onPolygonMouseOut}
      onPolygonMouseOver= {onPolygonMouseOver}
      onPolygonClick= {onPolygonClick}
      onPolygonCloseClick= {onPolygonCloseClick}
    />
  , document.getElementById('blank-multipolygon')
  )

})()

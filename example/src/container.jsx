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
  var scale = (1 << 18);
  var center = [-73.95, 40.7];
  var data = {geometry: {coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{}, type: "Feature"};

  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      center= {center}
      data= {data}
    />
  , document.getElementById('blank-container')
  )

})()

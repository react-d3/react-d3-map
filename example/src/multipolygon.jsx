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
  var center = [-100.95, 40.7];
  var data = require('json!../data/states.json');

  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      center= {center}
      data= {data}
    />
  , document.getElementById('blank-multipolygon')
  )

})()

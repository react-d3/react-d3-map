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
  var scale = 1200 * 5;
  var center = [-5, 55.4];
  var uk = require('json!../data/uk.json');
  var data = topojson.feature(uk, uk.objects.places);

  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      center= {center}
      data= {data}
    />
  , document.getElementById('blank-point')
  )

})()

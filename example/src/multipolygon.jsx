"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('../../lib/index').Map;

var PolygonGroup = require('../../lib/index').PolygonGroup;

var css= require('./css/polygon.css');

// Example
(function() {
  var width = 1000;
  var height = 800;
  var scale = 1 << 12;
  var scaleExtent = [1 << 10, 1 << 14]
  var center = [-100.95, 40.7];
  var data = require('json!../data/states.json');

  var onPolygonMouseOut= function(e, d, i) {
    console.log('out')
    e.hidePopup();
  }
  var onPolygonMouseOver= function(e, d, i) {
    console.log('over')
    e.showPopup();
  }
  var onPolygonClick= function(e, d, i) {
    // e.showPopup();
  }
  var onPolygonCloseClick= function(e, id) {
    // e.hidePopup();
  }
  var popupContent = function(d) { return 'hi, i am polygon'; }

  var Container = React.createClass({
    render: function() {
      return (
        <g>
          <PolygonGroup
            key= {"polygon-test"}
            data= {data}
            popupContent= {popupContent}
            onClick= {onPolygonClick}
            onCloseClick= {onPolygonCloseClick}
            onMouseOver= {onPolygonMouseOver}
            onMouseOut= {onPolygonMouseOut}
            polygonClass= {"your-polygon-css-class"}
          />
        </g>
      )
    }
  })

  ReactDOM.render(
    <Map
      width= {width}
      height= {height}
      scale= {scale}
      scaleExtent= {scaleExtent}
      center= {center}
      clip={true}
      bounds={[[0, 0], [width, height]]}
    >
      <Container/>
    </Map>
  , document.getElementById('blank-multipolygon')
  )

})()

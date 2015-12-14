"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('../../lib/index').Map;
var ZoomControl = require('react-d3-map-core').ZoomControl;

var css= require('./css/polygon.css');

// Example
(function() {
  var width = 1000;
  var height = 800;
  var scale = (1 << 18);
  var center = [-73.95, 40.7];
  var data = {geometry: {coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{"text": "hi, this is a polygon!"}, type: "Feature"};
  var popupContent = function(d) { return d.properties.text; }

  var Container = React.createClass({
    getInitialState: function() {
      return {
        scale: scale
      }
    },
    zoomOut: function() {
      this.setState({
        scale: this.state.scale / 2
      })
    },
    zoomIn: function() {
      this.setState({
        scale: this.state.scale * 2
      })
    },
    render: function() {

      var zoomIn = this.zoomIn;
      var zoomOut = this.zoomOut;

      var styleContainer = {
        position: 'relative',
        backgroundColor: '#EEE',
        width: width
      }

      return (
        <div style= {styleContainer}>
          <Map
            width= {width}
            height= {height}
            scale= {scale}
            zoomScale= {this.state.scale}
            center= {center}
            data= {data}
            popupContent= {popupContent}
          />
          <ZoomControl
            zoomInClick= {zoomIn}
            zoomOutClick= {zoomOut}
          />
        </div>
      )
    }
  })

  ReactDOM.render(
    <Container/>
  , document.getElementById('blank-container')
  )

})()

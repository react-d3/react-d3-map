"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var MapResponsive = require('../../lib/index').MapResponsive;

var ResponsivePolygonGroup = require('../../lib/index').ResponsivePolygonGroup;

var css= require('./css/polygon.css');
var mobile_css = require('./css/mobile.css');

// Example
(function() {
  var scale = 1 << 12;
  var scaleExtent = [1 << 10, 1 << 14]
  var center = [-100.95, 40.7];
  var data = require('json!../data/states.json');

  var popupContent = function(d) { return 'hi, i am polygon'; }

  var Container = React.createClass({
    getInitialState: function() {
      return {width: window.innerWidth - 50, height: window.innerHeight - 50}
    },
    updateDimensions: function() {
      this.setState({width: window.innerWidth- 50, height: window.innerHeight - 50});
    },
    componentWillMount: function() {
        this.updateDimensions();
    },
    componentDidMount: function() {
      window.addEventListener("resize", this.updateDimensions);
    },
    render: function() {
      var width = this.state.width;
      var height = this.state.height;

      return (
        <MapResponsive
          width= {width}
          height= {height}
          scale= {scale}
          scaleExtent= {scaleExtent}
          center= {center}
          clip={true}
          bounds={[[0, 0], [width, height]]}
        >
          <ResponsivePolygonGroup
            key= {"polygon-test"}
            data= {data}
            popupContent= {popupContent}
            polygonClass= {"your-polygon-css-class"}
          />
        </MapResponsive>
      )
    }
  })

  ReactDOM.render(
    <Container/>
  , document.getElementById('blank-mapresponsive')
  )

})()

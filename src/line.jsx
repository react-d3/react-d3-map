
var React = require('react');
var ReactDOM = require('react-dom');
var topojson = require('topojson');

var Map = require('../../lib/index').Map;

var css= require('./css/polygon.css');

// Example
(function() {
  var width = 1000;
  var height = 800;
  var scale = 1 << 22;
  var scaleExtent = [1 << 20, 1 << 24]
  var center = [-122.486052, 37.830348];
  var popupContent = function(d) { return d.properties.text; }
  var data = {
          "type": "Feature",
          "properties": {
            "text": "this is a LineString"
          },
          "geometry": {
              "type": "LineString",
              "coordinates": [
                  [-122.48369693756104, 37.83381888486939],
                  [-122.48348236083984, 37.83317489144141],
                  [-122.48339653015138, 37.83270036637107],
                  [-122.48356819152832, 37.832056363179625],
                  [-122.48404026031496, 37.83114119107971],
                  [-122.48404026031496, 37.83049717427869],
                  [-122.48348236083984, 37.829920943955045],
                  [-122.48356819152832, 37.82954808664175],
                  [-122.48507022857666, 37.82944639795659],
                  [-122.48610019683838, 37.82880236636284],
                  [-122.48695850372314, 37.82931081282506],
                  [-122.48700141906738, 37.83080223556934],
                  [-122.48751640319824, 37.83168351665737],
                  [-122.48803138732912, 37.832158048267786],
                  [-122.48888969421387, 37.83297152392784],
                  [-122.48987674713133, 37.83263257682617],
                  [-122.49043464660643, 37.832937629287755],
                  [-122.49125003814696, 37.832429207817725],
                  [-122.49163627624512, 37.832564787218985],
                  [-122.49223709106445, 37.83337825839438],
                  [-122.49378204345702, 37.83368330777276]
              ]
          }
      }

  var onLineMouseOut= function(dom , d, i) {
    console.log('out')
  }
  var onLineMouseOver= function(dom, d, i) {
    console.log('over')
  }
  var onLineClick= function(dom, d, i) {
    console.log('click')
  }
  var onLineCloseClick= function(id) {
    console.log('close click')
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
      onLineClick= {onLineClick}
      onLineCloseClick= {onLineCloseClick}
      onLineMouseOver= {onLineMouseOver}
      onLineMouseOut= {onLineMouseOut}
    />
  , document.getElementById('blank-line')
  )

})()

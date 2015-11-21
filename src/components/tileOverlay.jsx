"use strict";

import {
  default as React,
  Component,
  PropTypes
} from 'react';

import {
  default as ReactFauxDOM,
} from 'react-faux-dom';

export default class TileOverlay extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    tileClass: 'react-d3-map__tile_overlay'
  }

  static propTypes = {
    tiles: PropTypes.array.isRequired,
    tileClass: PropTypes.string,
    scale: PropTypes.number.isRequired,
    translate: PropTypes.array.isRequired
  }

  _mkTile(dom) {
    const {
      tiles,
      tileClass,
      onMouseOut,
      onMouseOver
    } = this.props;

    var tileDom = d3.select(dom);

    var image = tileDom.selectAll('image')
      .data(tiles, function(d) { return d; });

    image.exit()
      .remove();

    image.enter().append('image')
      .attr('class', `${tileClass} tile`)
      .attr('key', (d, i) => { return i; })
      .attr("xlinkHref", (d) => { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", (d) => { return d[0];})
      .attr("y", (d) => { return d[1];})

    if(onMouseOut)
      image.on("mouseover", function (d, i) {return onMouseOver(this, d, i);})

    if(onMouseOver)
      image.on("mouseout", function (d, i) {return onMouseOut(this, d, i);} )

    return tileDom;
  }

  render () {
    const {
      scale,
      translate
    } = this.props;

    var tile = ReactFauxDOM.createElement('g');
    var chart = this._mkTile(tile)

    var chartComponent = chart.node().children.map((d) => {return d.toReact();});
    var transform = "scale(" + scale + ")translate(" + translate + ")";

    return (
      <g
        transform={transform}
      >
        {chartComponent}
      </g>
    );
  }

}

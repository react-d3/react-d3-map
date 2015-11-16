examples = [
  {
    "link": "container",
    "title": "Container"
  }
];


var canner = examples.map(function(d) {
  return {
    "layout": "./layout.hbs",
    "filename": './' + d.link + '.html',
    "data": {
      "link": d.link,
      "title": d.title
    }
  }
})

module.exports = canner;

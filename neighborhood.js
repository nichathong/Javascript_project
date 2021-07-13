// const width = 900;
// const height = 600;

// const svg = d3
// .select('body')
// .append('svg')
// .attr('width', width)
// .attr('height', height);

// const projection = d3.geoMercator().scale(140)
//     .translate([width / 2, height / 1.4]);
// const path = d3.geoPath(projection);

// const g = svg.append('g');

// d3.json("Bay_Area_Counties.geojson")
//     .then(data => {

//         const countries = topojson.feature(data, data.features);
//         g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);

//     });
// const width = 900;
// const height = 600;

//worked!
// var w = 500;
// var h = 600;
// var canvas = d3.select("body").append("svg")
//     .attr("width", w)
//     .attr("height", h)

// d3.json("Bay_Area_Counties.geojson", function (data) {
//     var group = canvas.selectAll("g")
//         .data(data.features)
//         .enter()
//         .append("g")

//     var projection = d3.geoMercator();
//     var path = d3.geoPath(projection);

//     var areas = group.append("path")
//         .attr("d", path)
//         .attr("class", "area")
//         .attr("fill", "steelblue");
// });

var w = 1000;
var h = 500;

var projection = d3.geoMercator()
  .center([-123, 38]) // as you had
  .scale(10000) // or whatever
  .translate([w/2,h/2])


var path = d3.geoPath().projection(projection);

var svg = d3.select(".county-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

d3.json("Bay_Area_Counties.geojson", function (data) {
    svg.selectAll('path')
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "steelblue")
});

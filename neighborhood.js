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
  .center([-123, 38]) 
  .scale(10000) 
  .translate([w/2,h/2])


var path = d3.geoPath().projection(projection);

var svg = d3.select(".county-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    //create color palette for house price
var color = d3.scaleLinear()
        .domain([600000, 800000, 1000000, 1500000])
        .range(['#feedde','#fdbe85','#fd8d3c','#d94701']);

    //look into  data, iterate over ""median-house-price.csv"" find the max value in the price col
d3.csv("median-house-price.csv", function(data){
    color.domain([
        0, d3.max(data, function(d) {return d.price; })
    ]);

    d3.json("Bay_Area_Counties.geojson", function (json) {
        //join data together
        for (let i = 0; i < data.length; i++) {
            let counties = data[i].county;
            // console.log(data[i].county);
            // console.log(counties);  
            var val = data[i].price;
            // console.log(data);
            // console.log(data[i].price);

            for (let j = 0; j < json.features.length; j++) {
                let bayCounties = json.features[j].properties.county;
                // console.log(bayCounties);
                // console.log(json);
                if (counties === bayCounties) { // county name are matche
                    // console.log(counties === bayCounties)
                    // console.log(housePrice);
                    json.features[j].properties.value = val;
                    // console.log(json.features[j].properties.value) 
                    break;
                }
            }
        }
        svg.selectAll('path')
            .data(json.features)
            .enter()
            .append("path")
            .attr("countyName", function (d) {
                return d.properties.county;
            })
            .attr("d", path)
            .style("fill", function(d) {
                var value = d.properties.value;

                // console.log(value);
                if (value) {
                    // console.log(color(value))
                   return color(value); 
                } else {
                    return "#780278"
                }
            })
            .on('mouseover', function(d) {
                d3.selectAll(".county")
                    .transition()
                    .duration(200)
                    .style("opacity", .5)
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 15)
                    .style("stroke", "black")

                d3.select(".county")
                    .text(d.county)
                    .text("here is my text");

                // d3.select(".females")
                //     .text(d.details && d.details.females && "Female " + d.details.females || "¯\\_(ツ)_/¯");

                // d3.select(".males")
                //     .text(d.details && d.details.males && "Male " + d.details.males || "¯\\_(ツ)_/¯");

                d3.select('.details')
                    .style('visibility', "visible")
            })
            .on('mouseout', function (d) {
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", .8)
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke", "transparent")
                // d3.select(this)
                //     .style("stroke", null)
                //     .style("stroke-width", 0.25);

                // d3.select('.details')
                //     .style('visibility', "hidden");
            })
            
    });
  
});


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

        //add tooltip
        var mapTooltip = d3.select("body").append("div")
            .attr("class", "tooltip")               
            .attr("id", "mapTooltip")
            .style("opacity", 0);

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
                mapTooltip.transition()
                    .duration(500)
                    .style("opacity", .9)

                var tip = "<strong>" + d.properties.county + "</strong></br>"
                
                mapTooltip.html(tip) 
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px"); 

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

                d3.select('.details')
                    .style('visibility', "visible")
            })
            .on('mouseout', function (d) {
                mapTooltip.transition()        
                    .duration(500)      
                    .style("opacity", 0);  
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", .8)
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke", "transparent")

            })
        //get county name
        svg.selectAll(".county-circle")
            .data(json.features)
            .enter()
            .append("circle")
            .attr("r", 2)
            .attr("cx", function(d) {
                var coords = projection([-122.01052900085348, 38.09289899771702])
                // console.log(d.geometry.coordinates)
                // console.log(d)
                // console.log(coords);
                return coords[0];
            })
            .attr("cy", function(d) {
                var coords = projection([-122.01052900085348, 38.09289899771702])
                return  coords[1];
            })

        svg.selectAll(".city-label")
            .data(json.features)
            .enter().append("text")
            .attr("class", "county-label")
            .attr("x", function(d) {
                var coords = projection([-122.01052900085348, 38.09289899771702])
                // console.log(d.geometry.coordinates)
                // console.log(d)
                // console.log(coords);
                return coords[0];
            })
            .attr("y", function(d) {
                var coords = projection([-122.01052900085348, 38.09289899771702])
                return  coords[1];
            })
            .text(function(d) {
                // return (d.properties.county);
                return "Alemeda"
            })
            .attr("dx", 10)
            .attr("dy", 5)




            
    });
  
});


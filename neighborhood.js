
var w = 700;
var h = 520;

var projection = d3.geoMercator()
  .center([-122.5, 37.9]) 
  .scale(11000) 
  .translate([w/2,h/2])


var path = d3.geoPath().projection(projection);

var svg = d3.select(".county-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    //create color palette for house price
var color = d3.scaleLinear()
        .domain([500000, 3000000])
        .range(['#feedde','#fd8d3c']);

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
                var tip = tip + "<strong>Median House Price:</strong> $" + d.properties.value + "<br/>";
                
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

            var legendData=[];

            json.features.forEach(function(prop){

                var val = parseFloat(prop.properties.value)

                if (val) {legendData.push(val);}

                
            });

            legendData.sort(function(a,b){ return a-b;});


        //get county name
        svg.selectAll(".county-circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2)
            .attr("cx", function(d) {
                var coords = projection([d.lat, d.long])

                return coords[0];
            })
            .attr("cy", function(d) {
                var coords = projection([d.lat, d.long])
                return  coords[1];
            })

        svg.selectAll(".city-label")
            .data(data)
            .enter().append("text")
            .attr("class", "county-label")
            .attr("x", function(d) {
                var coords = projection([d.lat, d.long])
                // console.log(d)
                return coords[0];
            })
            .attr("y", function(d) {
                var coords = projection([d.lat, d.long])
                return  coords[1];
            })
            .text(function(d) {
                return d.county;
            })
            .attr("dx", 10)
            .attr("dy", 5)

            
            
    });
  
});


// var n = 6, // number of layers
//     m = 13; // number of samples per layer

// var margin = {top: 20, right: 50, bottom: 100, left: 75},
//     width = 740 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var svg = d3.select(".charts-container").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.csv("poverty-data.csv", function (data){    
//     var headers = ["Under $1000","$1000 - 9999","$10000 - 19999","$20000 - 99999","$100K - 999999","Over $1 Million"];
//     var layers = d3.layout.stack()(headers.map(function(priceRange) {
//         return data.map(function(d) {
//           return {x: d.Category, y: +d[priceRange]};
//         });
//     }));
    
//     var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
//     var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

//     var xScale = d3.scale.ordinal()
//         .domain(layers[0].map(function(d) { return d.x; }))
//         .rangeRoundBands([25, width], .08);

//     var y = d3.scale.linear()
//         .domain([0, yStackMax])
//         .range([height, 0]);

//     var color = d3.scale.ordinal()
//         .domain(headers)
//         .range(["#98ABC5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);
      
//     var xAxis = d3.svg.axis()
//         .scale(xScale)
//         .tickSize(0)
//         .tickPadding(6)
//         .orient("bottom");

//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .tickFormat(d3.format(".2s"));

//     var layer = svg.selectAll(".layer")
//         .data(layers)
//         .enter().append("g")
//         .attr("class", "layer")
//         .style("fill", function(d, i) { return color(i); });

//     var rect = layer.selectAll("rect")
//         .data(function(d) { return d; })
//         .enter().append("rect")
//         .attr("x", function(d) { return xScale(d.x); })
//         .attr("y", height)
//         .attr("width", xScale.rangeBand())
//         .attr("height", 0);

//     rect.transition()
//         .delay(function(d, i) { return i * 10; })
//         .attr("y", function(d) { return y(d.y0 + d.y); })
//         .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

//     //********** AXES ************
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//         .selectAll("text").style("text-anchor", "end")
//             .attr("dx", "-.8em")
//             .attr("dy", ".15em")
//             .attr("transform", function(d) {
//                   return "rotate(-45)" 
//                 });
    
//     svg.append("g")
//         .attr("class", "y axis")
//         .attr("transform", "translate(20,0)")
//         .call(yAxis)
//       .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr({"x": -150, "y": -70})
//         .attr("dy", ".75em")
//         .style("text-anchor", "end")
//         .text("# of campaigns");

//     var legend = svg.selectAll(".legend")
//         .data(headers.slice().reverse())
//             .enter().append("g")
//             .attr("class", "legend")
//             .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")"; });
       
//         legend.append("rect")
//             .attr("x", width - 18)
//             .attr("width", 18)
//             .attr("height", 18)
//             .style("fill", color);
    
//         legend.append("text")
//               .attr("x", width - 24)
//               .attr("y", 9)
//               .attr("dy", ".35em")
//               .style("text-anchor", "end")
//               .text(function(d) { return d;  });


//     d3.selectAll("input").on("change", change);

//     var timeout = setTimeout(function() {
//       d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
//     }, 2000);

//     function change() {
//       clearTimeout(timeout);
//       if (this.value === "grouped") transitionGrouped();
//       else transitionStacked();
//     }

//     function transitionGrouped() {
//       y.domain([0, yGroupMax]);

//       rect.transition()
//           .duration(500)
//           .delay(function(d, i) { return i * 10; })
//           .attr("x", function(d, i, j) { return xScale(d.x) + xScale.rangeBand() / n * j; })
//           .attr("width", xScale.rangeBand() / n)
//         .transition()
//           .attr("y", function(d) { return y(d.y); })
//           .attr("height", function(d) { return height - y(d.y); });

//       rect.on("mouseover", function() { tooltip.style("display", null); })
//         .on("mouseout", function() { tooltip.style("display", "none"); })
//         .on("mousemove", function(d) {
//           var xPosition = d3.mouse(this)[0] - 15;
//           var yPosition = d3.mouse(this)[1] - 25;
//           tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//           tooltip.select("text").text("hello world");
//         });
//     };

//     function transitionStacked() {
//       y.domain([0, yStackMax]);

//       rect.transition()
//           .duration(500)
//           .delay(function(d, i) { return i * 10; })
//           .attr("y", function(d) { return y(d.y0 + d.y); })
//           .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
//         .transition()
//           .attr("x", function(d) { return xScale(d.x); })
//           .attr("width", xScale.rangeBand());

//       rect.on("mouseover", function() { tooltip.style("display", null); })
//         .on("mouseout", function() { tooltip.style("display", "none"); })
//         .on("mousemove", function(d) {
//           var xPosition = d3.mouse(this)[0] - 15;
//           var yPosition = d3.mouse(this)[1] - 25;
//           // console.log(xPosition);
//           tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//           tooltip.select("text").text("hello world");
//         });
//     };

//     var tooltip = svg.append("g")
//         .attr("class", "tooltip");
        
//     tooltip.append("rect")
//         .attr("width", 30)
//         .attr("height", 20)
//         .attr("fill", "red")
//         .style("opacity", 0.5);
     
//     tooltip.append("text")
//         .attr("x", 15)
//         .attr("dy", "1.2em")
//         .style("text-anchor", "middle")
//         .attr("font-size", "12px")
//         .attr("font-weight", "bold");
// });

// var margin = {top: 20, right: 30, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var y = d3.scaleLinear()
//     .rangeRound([height, 0])
// 		.nice();

// var x = d3.scaleBand()
//     .rangeRound([0, width])
//     .paddingInner(0.05)
//     .align(0.1)
    
// var z = d3.scaleOrdinal(d3.schemeCategory20)

//   // Date format https://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95
//   var parseTime  = d3.timeParse("%b %Y")
  
  
//     // Load stocks data
//   // Ex: 0: {symbol: "MSFT", date: "Jan 2000", price: "39.81"}
//   d3.csv('https://raw.githubusercontent.com/LyonDataViz/MOS5.5-Dataviz/master/data/stocks.csv', function(error, raw) {
    
//     var symbols = [];
//     var data = []
    
//     // Data pre-processing
//     raw.forEach(function(d, i) {
      
//       if(symbols.indexOf(d.symbol) < 0) {
//         symbols.push(d.symbol)
//         data[symbols.indexOf(d.symbol)] = [];
//       }
      
//       // String to INT
//       d.value = +d.price;     
 
//       // Parsing time
//       d.date = parseTime(d.date)
//       data[symbols.indexOf(d.symbol)].push(d);
//     });
    
//     var data_nest = d3.nest()
//     	.key(function(d) { return d.date.getFullYear(); })
//     	.key(function(d) { return d.symbol; })
//     	.rollup(function(v) { return d3.sum(v, function(d) { return d.price; }); })
// 			.entries(raw);
    
//     var years = data_nest.map(function(d) { return d.key; })
    
//     // d3-stack format https://github.com/d3/d3-shape/blob/master/README.md#stack_keys
//     // {MSFT: 356.07999999999987, AMZN: 527.17, IBM: 1162.97, AAPL: 260.98}
//     var data_stack = []
    
//     data_nest.forEach(function(d, i) {
//       d.values = d.values.map(function(e) { return e.value; })
//       var t ={}
//       symbols.forEach(function(e, i) {
//         t[e] = d.values[i]
//       })
//       t.year = d.key;
//       data_stack.push(t)
//     })
    
//     console.log(data_stack)
    
//     var layers = d3.stack().keys(symbols)(data_stack);

//     var max = d3.max(layers[layers.length-1], function(d) { return d[1]; });
    
//     y.domain([0, max]);
//     x.domain(years);
    
//     console.log(data_stack)
    
//     var svg = d3.select("body").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     svg.append("g").selectAll("g")
//           .data(layers)
//       .enter().append("g")
//         .style("fill", function(d) { return z(d.key); })	
//         .selectAll("rect")
//       .data(function(d) {  return d; })
//         .enter().append("rect")
//           .attr("x", function(d, i) { return x(d.data.year); })
//           .attr("y", function(d) { return y(d[1]); })
//           .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//           .attr("width", x.bandwidth());
    
//     svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x))
    
//     svg.append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(" + (0) + ", 0)")
//       .call(d3.axisLeft().scale(y))
    
//     })









var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svgx = d3.select(".charts-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
d3.csv("poverty-data.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d.county)}).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
    svgx.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 40])
        .range([ height, 0 ]);
    svgx.append("g")
        .call(d3.axisLeft(y));
var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#760dff','#0dffdf'])

  // Show the bars
  svgx.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d) { return "translate(" + x(d.county) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .attr("x", function(d) { return xSubgroup(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.key); });

});
// var quantize = d3.scaleQuantize()
//   .domain([400000, 2000000])
//   .range(d3.range(4).map(function(i) { return "q" + i + "-9"; }));

// var svg = d3.select("svg");

// svg.append("g")
//   .attr("class", "legendQuant")
//   .attr("transform", "translate(20,20)");

// var legend = d3.legendColor()
//   .labelFormat(d3.format(".2f"))
//   .useClass(true)
//   .title("A really really really really really long title")
//   .titleWidth(100)
//   .scale(quantize);

// svg.select(".legendQuant")
//   .call(legend);
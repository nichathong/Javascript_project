
var margin = {top: 70, right: 10, bottom: 100, left: 100},
    width = 700 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var svgx = d3.select(".charts-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div").attr("class", "tooltip-chart");          

d3.csv("poverty-data.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d){return(d.county)}).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([.1])
    svgx.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(3))
        .selectAll("text")
          .attr("transform", "translate(-10, 0)rotate(-45)")
          .style("text-anchor", "end");
    svgx.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 1.65)
        .attr("y", height + 80)
        .text("Bay Area's Counties");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 20])
        .range([ height, 0 ]);
    svgx.append("g")
        .call(d3.axisLeft(y));
    svgx.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Poverty Rate (%)");
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#939393','#f08e05'])
    
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
        .on("mouseover", onMouseOver) //add listenter to the event
        .on("mouseout", onMouseOut) 
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(600)
        // .delay(function(d, i) {reuturn i * 50})
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); });

        // var chartTooltip = d3.select("body").append("div")
        //     .attr("class", "tooltip-chart")
        //     .attr("id", "chartTip")
        //     .style("opacity", 0);

        //MouseOver event handler
        function onMouseOver(d, i) {
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.county) + "<br>" + "$" + (d.cpm_poverty_rate))
            d3.select(this).attr('class', 'highlight')
            d3.select(this)
                .transition() //add animation
                .duration(300)
                .attr('width', xSubgroup.bandwidth() + 10)
                .attr('y', function(d) {return y(d.value) - 10})
                .attr('height', function(d) {return height - y(d.value);})
                .attr("fill", "#504a4a")
        }

        //mouseOut
        function onMouseOut(d, i) {
            tooltip.style("display", "none")
            d3.select(this).attr('class', 'bar')
            d3.select(this)
                .transition()
                .duration(300)
                .attr('width', xSubgroup.bandwidth())
                .attr('y', function(d) {return y(d.value);})
                .attr('height', function(d) {return height - y(d.value);})
                .attr("fill", function (d) {return color(d.key);})
        
        }

        // //chartooltip
            //add tooltip

        // var chartTooltip = d3.select("body").append("div")
        //     .attr("class", "tooltip-chart")
        //     .attr("id", "chartTip")
        //     .style("opacity", 0);

        // function onMouseOver(d) {
        //     chartTooltip.transition()
        //         .duration(500)
        //         .syle("opacity", .9)

        //     var detail = "<strong>" + d.cpm_poverty + "</strong></br>";
        //     var detail = detail + "<strong>Official Povertyrate:</strong> " + d.official_poverty_rate + "<br/>";

        //     chartTooltip.html(detail)
        //         .style("left", (d3.event.pageX) + "px")     
        //         .style("top", (d3.event.pageY - 28) + "px"); 
        // }

        // function onMouseOut(d) {
        //     chartTooltip.transition()        
        //         .duration(500)      
        //         .style("opacity", 0); 
        // }

});
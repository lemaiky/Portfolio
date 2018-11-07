var clientRect = d3.select(".skills").node().getBoundingClientRect();
var margin = {top: 10, right: 30, bottom: 0, left: 0},
    widthOv = clientRect.width,
    heightOv = clientRect.height,
    heightUnit = heightOv / (2018 - 2011),
    widthOffset = widthOv / 20,
    heightOffset = 5,
    translateWidth = 200;

var svgSkills = d3.select('.skills').append("svg")
	.attr("width", widthOv)
    .attr("height", heightOv);

var xScale =  d3.scaleLinear()
        .domain([0,5])
        .range([0, 200]);

var xAxis = d3.axisTop()
        .scale(xScale)
        .ticks(5);

d3.csv("data/skillsdata.csv", row, function(error, data) {
    if (error) throw error;

    // Setup position for every datum; Applying different css classes to parents and leafs.
    var node = svgSkills.selectAll(".node")
            .data(data)
            .enter().append("g")
            .attr("class", function(d) { return "node node--leaf"; })
            .attr("transform", function(d,i) { return "translate(" + 15 + "," + (25*i+15) + ")"; });

    // Setup G for every leaf datum.
    var leafNodeG = svgSkills.selectAll(".node--leaf")
            .append("g")
            .attr("class", "node--leaf-g")
            .attr("transform", "translate(" + 8 + "," + -13 + ")");

    leafNodeG.append("rect")
            .attr("class","shadow")
            .style("fill", function(d) {return d.color;})
            .attr("width", 2)
            .attr("height", 20)
            .attr("rx", 2)
            .attr("ry", 2)
            .transition()
                .duration(800)
                .attr("width", function(d) {return xScale(d.value);});

    leafNodeG.append("text")
            .attr("dy", 15)
            .attr("x", 10)
            .style("text-anchor", "start")
            .style("stroke", function(d) {return d.textcolor;})
            .text(function (d) {
                return d.id;
            });
});

function row(d) {
    return {
        id: d.id,
        value: +d.value,
        color: d.color,
        textcolor: d.textcolor
    };
}
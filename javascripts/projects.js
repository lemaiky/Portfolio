var client = d3.select(".right_bar").node().getBoundingClientRect();
var marginProject = {top: 10, right: 30, bottom: 0, left: 0},
    width = client.width,
    height = client.height,
    projectWidth = width / 4;

var svgProjects = d3.select('.right_bar').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(20, 15)");

d3.json("data/projects.json", function(error, data) {

    var projectContainer = svgProjects.selectAll(".project")
            .data(data)
            .enter().append("g")
            .attr("class", function(d) { return "project " + d.name.replace(" ",""); })
            .attr("transform", function(d,i) { return "translate(" + (275*(i%4)) + "," + (220*Math.round(i/4)) + ")"; });

    var project = svgProjects.selectAll(".project").append("rect")
            .attr("width", 250)
            .attr("height", 200)
            .attr("rx", 5)
            .attr("ry", 5);
});
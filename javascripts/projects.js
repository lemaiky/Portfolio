var client = d3.select(".right_bar").node().getBoundingClientRect();
var width = client.width,
    height = client.height,
    projectWidth = (width - (width*0.05)) / 5,
    projectHeight = (height - (height*0.04)) / 4,
    widthOffset = (width - (width*0.05)) / 4,
    heightOffset = (height - (height*0.04)) / 3;

var svgProjects = d3.select('.right_bar').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + (width*0.05) + ", " + (height*0.04) + ")");

d3.json("data/projects.json", function(error, data) {

    var projectContainer = svgProjects.selectAll(".project")
            .data(data)
            .enter().append("g")
            .attr("class", function(d) { return "project " + d.name.replace(" ",""); })
            .attr("transform", function(d,i) { return "translate(" + (widthOffset*(i%4)) + "," + (heightOffset*Math.floor(i/4)) + ")"; })
            .on("mouseover", projectMouseOver)
            .on("mouseout", projectMouseOut);

    var project = svgProjects.selectAll(".project").append("rect")
            .attr("width", projectWidth)
            .attr("height", projectHeight)
            .attr("rx", 5)
            .attr("ry", 5);

    projectContainer.append("svg:image")
            .attr("class", "project_img")
            .attr("height", projectHeight)
            .attr("width", projectWidth)
            .attr("xlink:href", function(d) {return d.img;})
            .attr("preserveAspectRatio", "none");

    // projectContainer.append("text")
    //         .attr("dy", 15)
    //         .attr("x", 10)
    //         .style("text-anchor", "start")
    //         .style("stroke", "black")
    //         .text(function (d) {
    //             return d.name;
    //         });
});

function projectMouseOver(d) {
    d3.select(this)
        .transition()
            .duration(100)
            .style("opacity", .2);
    
    var fill = d3.select(this).append("text")
        .attr("id", "project_name")
        .attr("y", projectHeight/2)
        .attr("x", projectWidth/2)
        .style("text-anchor", "middle")
        .attr("stroke", "black")
        .text(function (d) { return d.name;});
}

function projectMouseOut(d) {
    d3.select(this)
        .transition()
            .duration(100)
            .style("opacity", 1);
    
    d3.select("#project_name").remove();
}

function wrap(text) {
    
}
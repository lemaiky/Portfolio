var margin = {top: 20, right: 100, bottom: 20, left: 100},
    width = (window.innerWidth - margin.right - margin.left) / 2,
    height = window.innerHeight - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    rootProg;

var treeProg = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svgProg = d3.select("#programming").append("svg")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale =  d3.scale.linear()
                .domain([0,5])
                .range([0, 400]);

var xAxis = d3.svg.axis("top")
              .scale(xScale)
              .ticks(5);

d3.json("data/programming.json", function(error, flare) {
  if (error) throw error;

  rootProg = flare;
  rootProg.x0 = height / 2;
  rootProg.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  rootProg.children.forEach(collapse);
  updateProg(rootProg);
});

function updateProg(source) {

  // Compute the new tree layout.
  var nodes = treeProg.nodes(rootProg).reverse(),
      links = treeProg.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 150; });

  // Update the nodes…
  var node = svgProg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", clickProg);

  nodeEnter.append("circle")
      .attr("class", function(d) { return d.children || d._children ? "node--internal" : "node--leaf"; })
      .attr("r", 1)
      .style("fill", function(d) { return d._children ? "#aaa" : "#000"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6)
      .style("font-size", function(d) { return d.size; });

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("class", function(d) { return d.children || d._children ? "node--internal" : "node--leaf"; })
      .attr("r", function(d) { return d._children ? 7 : 5; })
      .style("fill", function(d) { return d._children ? "#aaa" : "#000"; });


  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("class", function(d) { return d.children || d._children ? "node--internal" : "node--leaf"; })
      .attr("r", 1);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  svgProg.selectAll(".node--leaf")
    .on("mouseover", function(d) {

    })

  // Update the links…
  var link = svgProg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function clickProg(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  updateProg(d);
}

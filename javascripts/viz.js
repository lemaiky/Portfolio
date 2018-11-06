/***********************************************************
 *
 * EDUCATION INFOVIZ DATA
 *
 ************************************************************/
var educationData;
var clientRect = d3.select("#education").node().getBoundingClientRect();
var margin = {top: 10, right: 30, bottom: 0, left: 0},
    widthOv = clientRect.width,
    heightOv = clientRect.height,
    heightUnit = heightOv / (2018 - 2011),
    widthOffset = widthOv / 20,
    heightOffset = 5,
    translateWidth = 200;

var svgEducation = d3.select('#education').append("svg")
	.attr("width", widthOv)
    .attr("height", heightOv + 30)
    .attr("transform", "translate(" + 0 + ", " + margin.top + ")");
	  		
var y = d3.scaleLinear()
		.domain([2011, 2018])
		.range([heightOv - heightOffset, 5]);

var yAxis = d3.axisLeft()
			.scale(y)
			.tickFormat(d3.format('.0f'))
			.tickValues([2011, 2016, 2018]);

/************************************************************
 *
 * EDUCATION INFOVIZ
 *
 ************************************************************/
d3.json("data/education.json", function(data) {
	educationData = data;

	// create the left chronological axis 
	svgEducation.append('g').classed('axis--y axis', true);
	svgEducation.select('.axis--y')
		.attr("transform", "translate(" + [35, 0] + ")")
		.call(yAxis);

	// create a group for each data row
	var container = svgEducation.selectAll('.node').data(educationData).enter()
	                .append("svg:g")
	                	.attr('class', 'node')
	                	.attr("transform", function(d, i) { 
	                		d.xPos = margin.right + (i+1) * widthOffset;
	                		return "translate(" + [margin.right + (i+1) * widthOffset, 0] + ")"; 
	                	});

	// create the line
	var lines = container.append("line")
				.attr('class', 'nodeLine')
				.attr("y1", function(d) {
					return (2018 - d.endDate) * heightUnit + heightOffset;
				})
				.attr("y2", function(d) {
					return (2018 - d.startDate) * heightUnit - heightOffset;
				})
				.on('mouseover', lineOverEventListener)
				.on('mouseout', lineOutEventListener);

	// create the text {year range, school, title, description}
	var text = container.append("svg:text")
	            .attr('class', 'nodeText')
	            .attr("opacity", 0)
	            .attr("text-anchor", "start")
	            .attr("dy", ".45em")
	            .attr("transform", function(d) { 
	            	var y = (2018 - d.endDate) * heightUnit + heightOffset;
	            	if(y > heightOv)
	            		y -= 30;
	            	return "translate(" + [10, y] + ")"; 
	            })
	            .append('tspan')
	            	.text(function(d) {return d.school})
	            	.attr("x", 0).attr("dy", ".9em")
	            	.attr('stroke-width', '.8px')
	            	.call(wrap, 35)
	            .append('tspan')
	            	.text(function(d) {return d.title})
	            	.attr("x", 0).attr("dy", ".9em")
	            	.attr('stroke-width', '.5px')
	            	.call(wrap, 35);
});

// event listener: on line over
function lineOverEventListener(d) {
	d3.select(this).style('stroke', "#F5CB5C");

	d3.selectAll('.node').filter(function(node) {return (node != d) && (educationData.indexOf(d) < educationData.indexOf(node) );})
		.attr("transform", function(d, i) {
			return "translate(" + [d.xPos + translateWidth, 0] + ")"; 
		});

	d3.selectAll(".nodeText").filter(function(node) {return node === d;})
		.attr("opacity", 1);
}

// event listener: on line out
function lineOutEventListener(d) {
	d3.select(this).style('stroke', "#16385B");

	d3.selectAll('.node').filter(function(node) {return (node != d) && (educationData.indexOf(d) < educationData.indexOf(node) );})
		.attr("transform", function(d, i) {
			return "translate(" + [d.xPos, 0] + ")"; 
		});

	d3.selectAll(".nodeText").filter(function(node) {return node === d;})
		.attr("opacity", 0);
}

// Source: https://bl.ocks.org/mbostock/7555321
function wrap(text, width) {
	text.each(function() {
        var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = .45, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().textContent.length > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                ++lineNumber;
                tspan = text.append("tspan").attr("x", 0).attr("dy", dy + "em").text(word);
            }
        }
    });
}
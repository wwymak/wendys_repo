d3.custom = {};

d3.custom.piechart = function module(){
	var width = 400, 
	    height = 400;
	var margin = {top: 80, bottom: 20, left: 80, right: 20}; 
	
	var svg;
	// var ease = 'linear';

	function exports(selection){
    	selection.each(function(_data){
    		var radius = width/2.5,
    		    innerRadius = width/4;
    		var colors= d3.scale.category20();

    		if (!svg) {
                svg = d3.select(this)
                    .append("svg")
                    .classed("chart", true);
                var container = svg.append("g").classed("container-group", true);
                container.append("g").classed("chart-group", true);
            }    
            
            //svg.transition().attr("width", width).attr("height", height);
            svg.attr("width", width).attr("height", height);
	    	svg.select(".container-group")
               .attr({transform: "translate(" + width/2 + "," + height/2 + ")"});

            var arc = d3.svg.arc()
                        .outerRadius(radius)
                        .innerRadius(innerRadius);

            var pie = d3.layout.pie()
                        // .sort(null)
                        .sort(function (d ,i){return i;})
                        .value(function(d){return d.values})

            var slices = svg.select(".chart-group").selectAll(".arc")
                            .data(pie(_data));

            slices.enter().append("path")
                  //.attr("class", "arc");
			      .attr("d", arc)
			      .style("fill", function(d, i) { return colors(i); });
            
            slices.transition().duration(1000).attrTween("d", function (d) {
                        var currentArc = this.__current__; // <-C

                        if (!currentArc)
                            currentArc = {startAngle: 0, 
                                            endAngle: 0};

                        var interpolate = d3.interpolate(
                                            currentArc, d);
                                            
                        this.__current__ = interpolate(1);//<-D
                        
                        return function (t) {
                            return arc(interpolate(t));
                        };
                    });
  
            // var labels = container.selectAll("text.label")
            //         .data(pie(_data)); 

            // labels.enter()
            //         .append("text")
            //         .attr("class", "label");

            // labels.transition()
            //         .attr("transform", function (d) {
            //             return "translate(" 
            //                 + arc.centroid(d) + ")"; // <-F
            //         })
            //         .attr("dy", ".35em")
            //         .attr("text-anchor", "middle")
            //         .text(function (d) {
            //             return d.data.name;});
			  

    	});
    };

    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        return this;
    };
    exports.radius = function(_x) {
        if (!arguments.length) return radius;
        radius = parseInt(_x);
        return this;
    };
    exports.innerRadius = function(_x) {
        if (!arguments.length) return innerRadius;
        radius = parseInt(_x);
        return this;
    };
    // exports.ease = function(_x) {
    //     if (!arguments.length) return ease;
    //     ease = _x;
    //     return this;
    // };

    return exports;
}

var chart2 = d3.custom.piechart();

updateYear2();

function updateYear2(){
    var year = document.getElementById('yearChosen').value;
    console.log(year);
    var data = dataAnalyse(year);
    d3.select("#figure2")
        .datum(data)
        .call(chart2);
}


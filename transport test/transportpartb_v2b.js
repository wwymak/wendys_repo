//working  version of bar chart with transition showing the distribution of distance travelled by passengers in the UK by 
//various transport modes
d3.custom = {};

d3.custom.barChart = function module (){
	var width = 600, 
	    height = 400;
	var margin = {top: 80, bottom: 20, left: 80, right: 20}; 
	var ease = 'circle';
	var gap = 1;
    var svg;
	
	var dispatch = d3.dispatch("customHover");

    function exports(selection){
    	selection.each(function(_data){
    		var chartWidth = width - margin.left - margin.right,
                chartHeight = height - margin.top - margin.bottom;

            var xAxisText = "Mode of transport";
            var yAxisText = "Distance travelled (billion km)"; 

	    	var xScale = d3.scale.ordinal().rangeRoundBands([0,chartWidth], 0.2).domain(_data.map(function(d){return d.name;})),
            // var    xScale = d3.scale.ordinal()
            //         .domain(_data.map(function(d, i) { return i; }))
            //         .rangeRoundBands([0, chartWidth], 0.2); 
                yScale = d3.scale.linear().range([chartHeight, 0]).domain([0, 750]);

            var xAxis = d3.svg.axis().orient("bottom").scale(xScale),
                yAxis = d3.svg.axis().orient("left").scale(yScale);

            var barWidth = chartWidth / _data.length;
            
            //add the svg group if there is none 
            if (!svg) {
                svg = d3.select(this)
                    .append("svg")
                    .classed("chart", true);
                var container = svg.append("g").classed("container-group", true);
                container.append("g").classed("chart-group", true);
                container.append("g").classed("x-axis-group axis", true);
                container.append("g").classed("y-axis-group axis", true).append("text").text(yAxisText).attr("y", (margin.right+20))
                                    .attr("x",height/3)
                                    .attr("transform", "rotate(90)")
                                    .attr("dy", "2em")
                                    .style("text-anchor", "middle");
            }
            //set attributes of the svg : main container + axes
	    	svg.transition().attr("width", width).attr("height", height);
	    	svg.select(".container-group")
               .attr({transform: "translate(" + margin.left + "," + margin.top + ")"});

            svg.select(".x-axis-group.axis")
            // .transition()
            // .ease(ease)
            .attr({transform: "translate(0," + (chartHeight) + ")"})
            // .attr("class", "axis")
            .call(xAxis);


            svg.select(".y-axis-group.axis")
            // .transition()
            // .ease(ease)
            .call(yAxis);   
            
            //draw the bars

            
            var gapSize = xScale.rangeBand()/100 * gap;
            var barWidth = xScale.rangeBand() - gapSize;

	    	var bars = svg.select(".chart-group").selectAll(".bar").data(_data);

	    	bars.enter().append("rect")
                .classed("bar", true)
                // .attr("fill", "blue")
                .attr("x", chartWidth)
                .attr("y", function(d){return yScale(d.values); })
                .attr("height", function(d){return (chartHeight - yScale(d.values));})
                .attr("width", barWidth)
                .on("mouseover", dispatch.customHover);

            bars.transition()//.ease(ease)
                .duration(750)
                .attr("x", function(d){return xScale(d.name) ;})
                .attr("y", function(d){return yScale(d.values); })
                .attr("height", function(d){return (chartHeight - yScale(d.values));})
                .attr("width", barWidth);

             bars.exit().transition().style({opacity: 0}).remove();

    	});    
    }

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
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    
    d3.rebind(exports, dispatch, "on");
    return exports;
}

function dataAnalyse(index){

    var A = theData[index];                                                                  
            var keys = Object.keys(A), 
                values = [];

            for (i = 0; i < keys.length; i++){
                values.push(A[keys[i]]);
            }  
     
    //remove year and all_road values from keys/values
            keys.shift();
            keys.splice(4,1);
            values.shift();
            values.splice(4,1);

            var dataSorted= []; 
            for (var i= 0; i<keys.length; i++){
            var B= {};
            B.name = keys[i]; B.values=values[i];
            dataSorted.push(B);
            };
    //var data1970 = dataSorted;
    return dataSorted;
    }

//usage
//random number generator to provide _i
//var _data = dataAnalyse(_i)

//update

var chart = d3.custom.barChart();

updateYear();

//function update() {
//     var i = Math.floor(Math.random()*43);
//     var data = dataAnalyse(i);
//     d3.select("#figure")
//         .datum(data)
//         .call(chart);
// }

// function randomDataset() {
//     return d3.range(~~(Math.random() * 50)).map(function(d, i) {
//         return ~~(Math.random() * 1000);
//     });
// }

//update();

function updateYear(){
    var year = document.getElementById('yearChosen').value;
    //console.log(year);
    var data = dataAnalyse(year);
    d3.select("#figure")
        .datum(data)
        .call(chart);
}

//setInterval(update, 1000);


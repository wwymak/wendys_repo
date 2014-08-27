var dataVis = {
	storage: chrome.storage.local,
	iso : d3.time.format.utc("%Y-%m-%dT%H:%M:%SZ"), //to parse strava's timestamp into date object

	init: function(){
		dataVis.activity = dataVis.storage.get("activityData", function(data){
			dataVis.currData = data.activityData; //stash the data for easy access
		});


	},

	avgTimeChart: function(containerID){
		dataVis.currData.forEach(function(d){
			d.startDate = dataVis.iso.parse(d.start_date_local);
			d.avgSpeed = d.average_speed *60 *60 /1000; //convert to km/h
		});

		var margin = {top: 10, left: 10, bottom: 10, right: 10},
		    width = parseInt(d3.select(containerID).style('width')),
		    width = width - margin.left - margin.right,
		    ratio = .5,
			height = width * ratio;

		var svg = d3.select(containerID).append("svg")
            .attr("width", width).attr("height", height).style("display", "block").style("margin", "auto");

        var xScale, yScale;
		//speed range in km/h
        var maxSpeed = d3.max(dataVis.currData, function(d){return d.avgSpeed});
        var minSpeed = d3.min(dataVis.currData, function(d){return d.avgSpeed});

        var maxDate = d3.max(dataVis.currData, function(d){return d.startDate});
        var minDate = d3.min(dataVis.currData, function(d){return d.startDate});

        xScale = d3.time.scale().domain([minDate, maxDate]).range([0, 0.9 * width]);
        yScale = d3.scale.linear().domain([0, maxSpeed]).range([0, 0.9 * height]);



	}


}

$(document).ready(function(){
	dataVis.init();
});
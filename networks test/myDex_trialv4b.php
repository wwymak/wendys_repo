<?php

//trying to generate a network diagram showing all the relationships between the tags
-
include_once 'lib_mydex.php';

function generate_source_target(){
  	
  $l = "1000";
  if(isset($_GET["l"])){
    $l = intval($_GET["l"]);       
  }
  
  $sql_query = "SELECT m1.tag AS source, m2.tag AS target
  FROM mydex_tags m1
  LEFT JOIN mydex_tags m2 ON m1.id = m2.id
  WHERE m1.tag != m2.tag
  ORDER BY m1.tag ASC 
  LIMIT " . $l;
  
  $STH = $GLOBALS['DBH']->prepare($sql_query);
  $STH->setFetchMode(PDO::FETCH_OBJ);
  $STH->execute();  
  $a = array();
  while ($row = $STH->fetch()) {    
      $a[] = '{source: "' . $row->source . '", target: "' . $row->target . '"}';
	 // $a[] = '{"source": "' . $row->source . '", "target": "' . $row->target . '"}';
    
  }

  $relations = '[';
  $relations .= implode(",", $a);
  $relations .= ']';

   print "var links = " . $relations . ";\n"; 

}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="d3.v3/d3.v3.min.js" charset="utf-8"></script>
    
    <script type="text/javascript" src="d3tip.js"></script>

    <script>
      <?php print generate_source_target();?>
    </script>
    
    <style>
    	path.link {
			fill: none;
			stroke: #666; stroke-width: 1.5px;
			}
			
	   circle {
			fill: #ccc;
			stroke: #fff; stroke-width: 1.5px;
			}
	   text {
			fill: #000;
		
		font: 10px sans-serif; pointer-events: none;
			}

    </style>
  </head>

  <body>
  	
  	<script>
  		var nodes = {};

// Compute the distinct nodes from the links.
  links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

	var width = 960,
	    height = 500;
	
	var force = d3.layout.force()
	    .nodes(d3.values(nodes))
	    .links(links)
	    .size([width, height])
	    .linkDistance(100)
	    .charge(-200)
	    .on("tick", tick)
	    .start();
	
	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height);
  		
   // svg.append("svg:defs").selectAll("marker")
    // .data(["end"])
  // .enter().append("svg:marker")
    // .attr("id", String)
    // .attr("viewBox", "0 -5 10 10")
    // .attr("refX", 15)
    // .attr("refY", -1.5)
    // .attr("markerWidth", 6)
    // .attr("markerHeight", 6)
    // .attr("orient", "auto")
  // .append("svg:path")
    // .attr("d", "M0,-5L10,0L0,5");
    
    var path = svg.append("svg:g").selectAll("path") .data(force.links())
  .enter().append("svg:path")
    .attr("class", "link")
    //.attr("marker-end", "url(#end)");

	var circle = svg.selectAll(".node") .data(force.nodes())
  	.enter().append("g")
    .attr("class", "node")
    .call(force.drag);
    
    circle.append("circle")
    .attr("r", 5);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .attr("transform", transform)
    .text(function(d) { return d.name; });

    circle.on("click", click)  
    .on("dblclick", dbclick);

	

// function radius(d){
//   var rad =  10 *  Math.log (d.size);
//   return rad 
// }

function click(){
  d3.select(this).select("text").transition()
    .duration(750)
    .attr("x", 22)
    .style("fill", "steelblue")
    .style("stroke", "lightsteelblue")
    .style("stroke-width", ".5px")
    .style("font", "20px sans-serif");

  d3.select(this).select("circle").transition() .duration(750)
    .attr("r", 16)
    .style("fill", "lightsteelblue");
};

function dbclick(){
  d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 5)
        .style("fill", "#ccc");

  d3.select(this).select("text").transition() .duration(750)
        .attr("x", 8)
        .style("stroke", "none")
        .style("fill", "black")
        .style("stroke", "none")
        .style("font", "10px sans-serif");

};

function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}


  	</script>

  </body></html>
<?php
//Close the DB connection
$DBH = null;
?>

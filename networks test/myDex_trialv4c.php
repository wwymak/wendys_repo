<?php

//trying to generate a network diagram showing all the relationships between the tags
//still need to find a way to limit the display!
-
include_once 'lib_mydex.php';

//generate the link data (i.e. source and target)

function generate_source_target(){
  	
  $l = "2000";
  if(isset($_GET["l"])){
    $l = intval($_GET["l"]);       
  }
  
  $sql_query = "SELECT DISTINCT m2.tag AS target, m1.tag AS source 
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

function generate_nodes(){
    
  $l = "2000";
  if(isset($_GET["l"])){
    $l = intval($_GET["l"]);       
  }
  
  $sql_query = "SELECT tag as name, count(id) as num
  FROM mydex_tags 
  GROUP BY tag
  ORDER BY num DESC
  LIMIT " . $l;
  
  $STH = $GLOBALS['DBH']->prepare($sql_query);
  $STH->setFetchMode(PDO::FETCH_OBJ);
  $STH->execute();  
  $b = array();
  while ($row = $STH->fetch()) {    
      $b[] = '{name: "' . $row->name . '", size: ' . $row->num . '}';
   // $b[] = '{"source": "' . $row->source . '", "target": "' . $row->target . '"}';
    
  }

  $relations2 = '[';
  $relations2 .= implode(",", $b);
  $relations2 .= ']';

   print "var nodes = " . $relations2 . ";\n"; 
   

}

// function combination(){
//   print "var link_nodes = { nodes:" .generate_source_target() .", links:" .generate_nodes() ."}"
// }


?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <script src="js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="d3.v3/d3.v3.min.js" charset="utf-8"></script>
  
    <script type="text/javascript" src="d3tip.js"></script>

    <script>
      <?php print generate_source_target();
            print generate_nodes();
             ?> </script>
            
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
//     links.forEach(function(link) {
//   link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
//   link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
// });
    //combine link and node info into one object

    var link_nodes = {"nodes": nodes, "links": links};
    var width = 960,
        height = 500;
    var force = d3.layout.force();  
    var nodeG = null, linkG = null;  

    var svg;

  //   charge = function(node) {
  //   return -5*Math.pow(node.radius, 2) ;
  // };

    function prepareData(theData){
      //set up the radius scale for the nodes so the circles scale with the no. of times the tags occur
      var sizeExtent = d3.extent(theData.nodes, function(d){return d.size;});
      var radiusScale = d3.scale.sqrt().range([4,16]).domain(sizeExtent); 

      //initial x, y coordinates

      theData.nodes.forEach(function(n){
        n.x = Math.floor(Math.random()*width);
        n.y = Math.floor(Math.random()*height);
        return n.radius = radiusScale(n.size);
      })

      nodesMap = mapNodes(theData.nodes);


      //set the source and target objects to refer to the node object instead of random assignments
      theData.links.forEach(function(l){
        l.source = nodesMap.get(l.source);
        l.target = nodesMap.get(l.target);
        return l
      });

      return theData;
  
    }

  //assign the referer to each object in the nodes array to be the name of that node
  mapNodes = function(nodes) {
    var nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {        
      return nodesMap.set(n.name, n);
    });
    return nodesMap;
  };

  prepareData(link_nodes);
  add_network("body");



  // to repackage from here

  //set layout (append svg and group elements)
  //function add_network(selection, data){
  function add_network(selection){  
    svg = d3.select(selection).append("svg")
      .attr("width", width)
      .attr("height", height);

    // nodeG = svg.append("g").attr("class", "nodes");
    // linkG = svg.append("g").attr("class", "links");

    force.size([width, height]);
    return svg;
  }

  //append data 
  // function updateLinks(){
  //   var path = linkG.selectAll("line").data(link_nodes.link).enter()
  //               .append("line")
  //               .attr("class", "link")
  //               .attr("x1", function(d){return d.source.x;})
  //               .attr("y1", function(d){return d.source.y;})
  //               .attr("x2", function(d){return d.target.x;})
  //               .attr("y2", function(d){return d.target.y;}) 

  //   path.exit.remove();
  //  }

  //  function updateNodes(){
  //   var circle = nodeG.selectAll("circle").data(curNodesData).enter()
  //                .append("circle").attr("class", "node")
  //                .attr("cx", function(d){return d.x;})
  //                .attr("cy", function(d){return d.y;})
  //                .attr("r", function(d){return d.radius; }) //check whether radius has been declared.
  //                .call(force.drag); 


  //   node.exit().remove();
  //  }    

  //assign force parameters
  
      force.nodes(link_nodes.nodes)
      .links(link_nodes.links)
      .linkDistance(100)
      //.charge(charge(link_nodes.nodes))
      .charge(-300)
      .on("tick", tick)
      .start();
  
  

  var path = svg.append("svg:g").selectAll("path") .data(force.links())
  .enter().append("svg:path")
    .attr("class", "link")
    //.attr("marker-end", "url(#end)");

  var circle = svg.selectAll(".node") .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag);
    
    circle.append("circle")
    .attr("r", function(d){return d.radius; });

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .attr("transform", transform)
    .text(function(d) { return d.name; });
    
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

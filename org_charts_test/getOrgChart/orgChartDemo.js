//this is all the js needed for the getorgchart js library 
$("#organisationChart").getOrgChart({		
	theme: "deborah",
	color: "blue",
	zoomable: false,
	linkType: "M",
	gridView: true,
	primaryColumns: ["name", "title"],
	imageColumn: "image",
	dataSource: "../orgStructure.xml"
});



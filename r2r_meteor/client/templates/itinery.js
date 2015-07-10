/**
 * Created by wwymak on 21/06/15.
 */

var queryForRoutes = function(){
    var fromDest = $("#fromInput").val();
    var toDest = $("#toInput").val();
    console.log(fromDest, toDest)
    Meteor.call('getRoutes', fromDest, toDest, function(err, result){
        console.log(result);
        Session.set("r2rRoutesObj", result);
    } );
}
Template.body.helpers({
    itineries:[
        {routeName: "Route 1"},
        {routeName: "Route 2"},
        {routeName: "Route 3"}
    ],

    routesNames : [
        {routeName: "Route 1a"},
        {routeName: "Route 2a"},
        {routeName: "Route 3a"}
    ]
});

Template.body.events({
    'blur #fromInput': function(event){
        queryForRoutes();
        //console.log($("#fromInput").val());
        //var fromDest = $("#fromInput").val();
        //var toDest = $("#toInput").val();
        ////if()
        //Meteor.call('getRoutes', fromDest, toDest, function(err, result){console.log(result)} )
    },
    'blur #toInput': function(event){
        queryForRoutes();
    },
    'submit #fromInput': function(event){
       event.preventDefault();
    },
    'submit #toInput': function(event){
        event.preventDefault();
    },
    'click #routeSearchBtn': function(event){
        event.preventDefault();
        queryForRoutes();
    }
});

Template.home.events({
    'blur #fromInput': function(event){
        queryForRoutes();
        //console.log($("#fromInput").val());
        //var fromDest = $("#fromInput").val();
        //var toDest = $("#toInput").val();
        ////if()
        //Meteor.call('getRoutes', fromDest, toDest, function(err, result){console.log(result)} )
    },
    'blur #toInput': function(event){
        queryForRoutes();
    },
    'submit #fromInput': function(event){
        event.preventDefault();
    },
    'submit #toInput': function(event){
        event.preventDefault();
    },
    'click #routeSearchBtn': function(event){
        event.preventDefault();
        queryForRoutes();
    }
});

Template.routeList.helpers({
    apiResult: function(){
        return Session.get("r2rRoutesObj");
    }
})


Template.routeList.rendered = function(){
    $(document).ready(function(){
        queryForRoutes();
    })

}

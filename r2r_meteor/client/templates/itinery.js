/**
 * Created by wwymak on 21/06/15.
 */

Template.body.helpers({
    itineries:[
        {routeName: "Route 1"},
        {routeName: "Route 2"},
        {routeName: "Route 3"}
    ]
});

Template.body.events({
    'blur #fromInput': function(event){
        console.log($("#fromInput").val());
    },
    'submit #fromInput': function(event){
       event.preventDefault();
    }
})

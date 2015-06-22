/**
 * For making calls to rome2rio api
 */
var r2rApi = {};
r2rApi.baseSearchApiUrl = "http://free.rome2rio.com/api/1.2/json/Search";
r2rApi.baseAutoCompleteApiURL = "http://free.rome2rio.com/api/1.2/json/Autocomplete";
r2rApi.apiKey = 'Gr0wkF5D';

Meteor.methods({
    getRoutes: function(from, to){
        this.unblock();
        return HTTP.call("GET", r2rApi.baseSearchApiUrl,{data:{
                key: r2rApi.apiKey,
                oName: from,
                dName: to
            }
        }, function(){});
    }
})

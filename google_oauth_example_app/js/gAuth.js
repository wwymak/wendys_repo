
var oauth = function(){

    var clientId = '1997';
    var clientSecret = '1d053ed7c52bf1823f20e11f04dbcf1e983d53d2';
    var redirectUri = 'https://' + chrome.runtime.id + '.chromiumapp.org/token_exchange';

    var requestUrl = "https://www.strava.com/oauth/authorize?" + "client_id=" + clientId + "&response_type=code" + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=mystate" + "&approval_prompt=force"
    var redirectRe = new RegExp(redirectUri + '[#\?](.*)');
    var access_token = null;

    return {

        getToken: function(interactive, callback) {
        // In case we already have an access_token cached, simply return it.
            if (access_token) {
                callback(null, access_token);
                return;
            }

            var requestParams = {
                "url": requestUrl,
                'interactive': true
            }

            chrome.identity.launchWebAuthFlow(requestParams, function(redirectUri){
                console.log('launchWebAuthFlow completed', chrome.runtime.lastError, redirectUri);

                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    return;
                }

                var matches = redirectUri.match(redirectRe);
                    if (matches && matches.length > 1){
                        var responseInfo = matches[1] //returns whatever Strava adds, so this is the 'state' and the 'code='info
                        handleResponse(parseRedirectInfo(responseInfo));
                    }
                    else{
                        console.log("error in matching uris")
                    }

            });

            function parseRedirectInfo(fragment) {
                var info = fragment.split(/&/);
                var values = {};

                info.forEach(function(d) {
                    var infoPair = d.split(/=/);
                    values[infoPair[0]] = infoPair[1];
                  });

              return values;
            }

            function handleResponse(values){
                    console.log(values)

                if(values.hasOwnProperty("code")){
                    exchangeCodeForToken(values.code);
                }

                else if (values.hasOwnProperty("access_token")){
                    setAccessToken(values.access_token);
                }

                else if (values.hasOwnProperty("error")){
                    console.error(values.error);
                }

                else {
                    console.error("no access token or code available!!")
                }

            }

            function setAccessToken(token){
                access_token = token; 
                console.log('Setting access_token: ', access_token);
            }

            function exchangeCodeForToken(code){
                var getTokenUrl = "https://www.strava.com/oauth/token";
                // var getTokenUrl = "https://www.strava.com/oauth/token?" + 'client_id=' + clientId + '&client_secret=' + clientSecret + '&code=' + code
                
                $.ajax({
                    'url' : getTokenUrl,
                    'type' : 'POST',
                    'data': {
                        'client_id' : clientId,
                        'client_secret' : clientSecret,
                        'code': code
                    },

                    'success' : function(response) {
                        console.log(response)
                        /* Example of successful response
                        Object {access_token: "c94b2cb98968485fb570b88cce4132736914b595", token_type: "Bearer", athlete: Object}
                        access_token: "c94b2cb98968485fb570b88cce4132736914b595"
                        athlete: Object
                        bikes: Array[0]
                        city: "Ware"
                        clubs: Array[0]
                        country: "United Kingdom"
                        created_at: "2014-02-08T21:58:30Z"
                        date_preference: "%m/%d/%Y"
                        email: "wwymak@gmail.com"
                        firstname: "Wendy"
                        follower: null
                        follower_count: 2
                        friend: null
                        friend_count: 2
                        ftp: null
                        id: 3887334
                        lastname: "Mak"
                        measurement_preference: "meters"
                        mutual_friend_count: 0
                        premium: false
                        profile: "avatar/athlete/large.png"
                        profile_medium: "avatar/athlete/medium.png"
                        resource_state: 3
                        sex: "F"
                        shoes: Array[0]
                        state: "England"
                        updated_at: "2014-08-03T17:00:09Z"
                        __proto__: Object
                        token_type: "Bearer"
                        __proto__: Object*/
                        

                    },
                    'error' : function(response){
                        console.error(response);
                    }
                });


            }
        },

        removeCachedToken: function(token_to_remove) {
            if (access_token == token_to_remove)
            access_token = null;
        }
    }
 

}
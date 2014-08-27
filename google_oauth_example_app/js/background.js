var storage= chrome.storage.local;
chrome.app.runtime.onLaunched.addListener(function() {
	storage.get("accessToken", function(data){
		if(data.accessToken == null ||data.accessToken == "undefined"){
			launchOauth();
		}
		else {
			openDataView();
		}
	})
    
});

function launchOauth() {
	chrome.app.window.create('../index.html', {
	  	id: "StravaOAuthTest",
	    bounds: {
		    width: 800,
		    height: 500
	    }
    });
}

function openDataView() {
	chrome.app.window.create('../dataView.html', {
	  	id: "StravaDataView",
	    bounds: {
		    width: 800,
		    height: 800
	    }
    });
}
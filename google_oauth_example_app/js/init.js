var setup = {
	auth: new oauth(),

	init: function(){
		$("#stravaLoginButton").on("click", function(e){
			e.preventDefault();
			setup.interactiveSignIn();

		})
	},

	interactiveSignIn: function() {
	    $("#stravaLoginButton").prop("disabled", true);
	    auth.getToken(true, function(error, access_token) {
	        if (error) {
		        $("#stravaLoginButton").prop("disabled", false);
	        } 
	        else {
		        console.log(access_token);
	        }
	    });
	  }
}


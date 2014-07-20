Accounts.onCreateUser(function(options,user){
	if(user.services.google){
		user.profile = {
			firstname: user.services.google.given_name,
			lastname: user.services.google.family_name,
			email: user.services.google.email,
			picture: user.services.google.picture,
			inbox: [],
			algorithmContributions: [],
			codeContributions: [],
			awards:[],
			points: 1
		}
	}
	if(user.services.github){
		var hash = CryptoJS.MD5(user.services.github.email);
		var img = 'http://www.gravatar.com/avatar/'+hash+'?s=500&d=retro';
		user.profile = {
			firstname: options.profile.name,
			lastname: "",
			email: user.services.github.email,
			picture: img,
			inbox: [],
			algorithmContributions: [],
			codeContributions: [],
			awards:[],
			points: 1
		}
	}
	return user;
});

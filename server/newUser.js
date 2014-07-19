Accounts.onCreateUser(function(options,user){
	if(user.services.google){
		user.profile = {
			name: user.services.google.name,
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
			name: options.profile.name,
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

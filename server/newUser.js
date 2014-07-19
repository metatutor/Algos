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
		user.profile = {
			name: options.profile.name,
			email: user.services.github.email,
			picture: null,
			inbox: [],
			algorithmContributions: [],
			codeContributions: [],
			awards:[],
			points: 1
		}
	}
	return user;
});

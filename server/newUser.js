Accounts.onCreateUser(function(options,user){
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
	return user;
});

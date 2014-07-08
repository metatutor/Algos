Accounts.onCreateUser(function(options,user){
	user.profile = {
		firstname: '',
		lastname: '',
		email: '',
		inbox: [],
		algorithmContributions: [],
		points: 1
	}
	return user;
});

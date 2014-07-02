Accounts.onCreateUser(function(options,user){
	user.profile = {
		firstname: '',
		lastname: '',
		algorithmContributions: [],
		points: 1
	}
	return user;
});

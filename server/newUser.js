Accounts.onCreateUser(function(options,user){
	user.profile = {
		firstname: '',
		lastname: '',
		email: '',
		inbox: [],
		algorithmContributions: [],
		codeContributions: [],
		awards:[],
		points: 1
	}
	return user;
});

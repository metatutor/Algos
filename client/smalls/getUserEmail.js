Template.getUsersEmail.getEmail = function(){
	var user = this;
	if(user.profile.hasOwnProperty('email')){
		return user.profile.email;
	}  
	return 'email not found';
}  

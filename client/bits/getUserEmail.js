Template.getUsersEmail.getEmail = function(){
	var user = this;
	if(user.hasOwnProperty('emails')){
		return user.emails[0].address;
	}  
	return 'email not found';
}  

Template.algoName.events = {
	'click button[name=goTo]': function(){
		Router.go('pedia', {_id: this.AiD});
	}  
}  

Template.userPage.getEmail = function(){
	var user = this;
	if(user.hasOwnProperty('emails')){
		return user.emails[0].address;
	}  
	return 'email not found';
}  

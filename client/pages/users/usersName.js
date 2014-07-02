Template.getUsersName.events = {
	'click button[name=goTo]': function(){
		Router.go('users', {_id: this.username});
	}  
}  

Template.getUsersName.getName = function(){
	var user = this;
	if(user.profile.hasOwnProperty('firstname')){
		return user.profile.firstname+' '+user.profile.lastname;
	}
	return "not yet set";
}

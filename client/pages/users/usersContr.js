Template.getUsersContributions.events = {
	'click button[name=goTo]': function(){
		Router.go('users', {_id: this.username});
	}  
}  

Template.getUsersContributions.noContributions = function(){
	var user = this;
	var count = user.profile.algorithmContributions.length;
	if(count===0){
		return true;
	}
	return false;
}

Template.getUsersContributions.getContributions = function(){
	var user = this;
	return user.profile.algorithmContributions;
}

Template.getUsersUsername.events = {
	'click button[name=goTo]': function(){
		Router.go('users', {_id: this.username});
	}  
}  

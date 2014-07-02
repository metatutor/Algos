Template.algoContributor.events = {
	'click button[name=goTo]': function(){
		Router.go('users', {_id: this.Contributor});
	}  
}  

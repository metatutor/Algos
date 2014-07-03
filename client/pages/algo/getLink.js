Template.getAlgoLink.events = {
	'click button[name=goTo]': function(){
		Router.go('algo', {_id: this.AiD});
	}
}

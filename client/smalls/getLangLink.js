Template.getLangLink.events = {
	'click button[name=goTo]': function(){
		Router.go('langs', {_id: this.Slug});
	}
}

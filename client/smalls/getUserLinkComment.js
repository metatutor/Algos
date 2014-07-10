Template.getUserLinkComment.events = {
	'click button[name=goTo]': function(){
		Router.go('users', {_id: this._id});
	}
}

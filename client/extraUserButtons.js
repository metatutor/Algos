Template._loginButtonsLoggedInDropdown.events({
	'click button[name=viewProfile]': function(event) {
		event.stopPropagation();
		Template._loginButtons.toggleDropdown();
		Router.go('users',{_id:Meteor.user().username});
	}
});

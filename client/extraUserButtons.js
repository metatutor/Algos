Template._loginButtonsLoggedInDropdown.events({
	'click #view-profile': function(event) {
		event.stopPropagation();
		Template._loginButtons.toggleDropdown();
		Router.go('profile');
	}
});

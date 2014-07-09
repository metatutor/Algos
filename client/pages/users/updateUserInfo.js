Template.updateUserInfo.events = {
	'click button[name=updateProfile]': function(event,template){
		event.preventDefault();
		var stats = {};
		var firstname= escapeHTML(template.find("input[name=firstname]").value);
		var lastname = escapeHTML(template.find("input[name=lastname]").value);
		var emailNew = escapeHTML(template.find("input[name=emailShow]").value);
		if(!(Match.test(firstname,String))){
			return;
		}
		if(!(Match.test(lastname,String))){
			return;
		}
		if(!(Match.test(emailNew,String))){
			return;
		}
		stats.firstname = firstname;
		stats.lastname = lastname;
		stats.email = emailNew;
		Meteor.call('updateProfile',stats,Meteor.userId());
		Session.set("editingProfile",false);
	}
}

function escapeHTML(s) {
	return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Meteor.methods({
	sendEmail: function(userID){
		Accounts.sendVerificationEmail(userID);			  
		console.log('user '+userID+' has requested a verification email');
	}
});

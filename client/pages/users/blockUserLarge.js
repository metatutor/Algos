Template.blockUserLarge.getPoints = function(user){
	return user.profile.points+' Reputation';
}

Template.blockUserLarge.awards = function(user){
	return _.uniq(user.profile.awards);
}

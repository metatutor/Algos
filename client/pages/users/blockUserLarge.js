Template.blockUserLarge.getPoints = function(user){
	if(user===undefined){
		return;
	}
	return user.profile.points+' Reputation';
}

Template.blockUserLarge.awards = function(user){
	if(user===undefined){
		return;
	}
	return _.uniq(user.profile.awards);
}

Template.blockUserLarge.getPicture = function(user){
	if(user===undefined){
		return;
	}
	return user.profile.picture;
}

Template.blockUserLarge.hasAwards = function(user){
	if(user===undefined){
		return;
	}
	return user.profile.awards.length;
}



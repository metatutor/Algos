Meteor.methods({
	updateProfile:function(profObj,userID){
		Meteor.users.update({
			_id:userID
		},{
			$set:{
				"profile.firstname": profObj.firstname,
				"profile.lastname": profObj.lastname
			}
		},{
			upsert:true
		});
	} 
});

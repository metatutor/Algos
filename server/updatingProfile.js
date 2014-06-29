Meteor.methods({
	updateProfile:function(profObj,userID){
		Meteor.users.update({
			_id:userID
		},{
			$set:{
				"profile": profObj
			}
		},{
			upsert:true
		});
	} 
});

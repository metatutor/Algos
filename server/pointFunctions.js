Meteor.methods({
	approve: function(uid,lid,cid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Approve:uid
			}
		});
		Meteor.users.update({
			_id:cid
		},{
			$inc:{
				'profile.points':1
			}
		});
	},
	unapprove: function(uid,lid,cid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Approve:uid
			}
		});
		Meteor.users.update({
			_id:cid
		},{
			$inc:{
				'profile.points':-1
			}
		});
	},
	disapprove: function(uid,lid,cid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Disapprove:uid
			}
		});
		Meteor.users.update({
			_id:cid
		},{
			$inc:{
				'profile.points':-1
			}
		});
	},
	undisapprove: function(uid,lid,cid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Disapprove:uid
			}
		});
		Meteor.users.update({
			_id:cid
		},{
			$inc:{
				'profile.points':1
			}
		});
	}
});

Meteor.methods({
	approve: function(uid,lid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Approve:uid
			}
		});
	},
	unapprove: function(uid,lid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Approve:uid
			}
		});
	},
	disapprove: function(uid,lid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Disapprove:uid
			}
		});
	},
	undisapprove: function(uid,lid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Disapprove:uid
			}
		});
	}
});

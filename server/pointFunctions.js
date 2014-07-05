Meteor.methods({
	approve: function(uname,lid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Approve:uname
			}
		});
	},
	unapprove: function(uname,lid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Approve:uname
			}
		});
	},
	disapprove: function(uname,lid){
		LSIs.update({
			_id: lid
		},{
			$addToSet:{
				Disapprove:uname
			}
		});
	},
	undisapprove: function(uname,lid){
		LSIs.update({
			_id: lid
		},{
			$pull:{
				Disapprove:uname
			}
		});
	}
});

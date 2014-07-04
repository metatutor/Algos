Meteor.methods({
	uploadLSI:function(lsiObject,aid){
		LSIs.insert({
			lsiObject
		});
	}
});

Meteor.methods({
	uploadLSI:function(lsiObject){
		LSIs.insert(lsiObject);
	}
});

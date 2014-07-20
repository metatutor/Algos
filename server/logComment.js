Meteor.methods({
	logComment:function(obj){
		Comments.insert(obj);
	}
});

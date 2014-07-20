Meteor.methods({
	logComment:function(obj){
		Comments.insert(obj);
	},
	giveService:function(i,s){
		ServiceConfiguration.configurations.insert({
			service: "github",
			clientId: i,
			secret: s
		});
	}
});

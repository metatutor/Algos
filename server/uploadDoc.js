Meteor.methods({
	uploadDoc:function(docObject,uname){
		AlgoPedia.insert({
			AiD: docObject.AiD,
			Name: docObject.Name,
			Short: docObject.Short,
			Contributor: uname,
			KeyWords: docObject.KeyWords,
			When: moment().unix(),
			Description:""
		});
		AlgoPedia.update({
			AiD: docObject.AiD
		},{
			$push:{
				pseudocode: docObject.Pseudo
			}
		});
		Meteor.users.update({
			username:uname
		},{
			$push:{
				"profile.algorithmContributions": docObject.AiD
			}
		});
	}
});

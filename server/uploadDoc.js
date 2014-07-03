Meteor.methods({
	uploadDoc:function(docObject,uname){
		AlgoPedia.insert({
			AiD: docObject.AiD,
			Name: docObject.Name,
			Short: docObject.Description,
			Pseudo: docObject.Pseudo,
			Contributor: uname,
			KeyWords: docObject.KeyWords,
			When: moment().unix(),
			Description:""
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

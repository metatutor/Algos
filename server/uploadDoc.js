Meteor.methods({
	uploadDoc:function(docObject,uname){
		AlgoPedia.insert({
			AiD: docObject.AiD,
			Name: docObject.Name,
			Description: docObject.Description,
			Pseudo: docObject.Pseudo,
			Contributor: uname,
			When: moment().unix()
		});
		docObject.When = moment().unix();
		Meteor.users.update({
			username:uname
		},{
			$push:{
				"profile.algorithmContributions": docObject
			}
		});
	}
});

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
		//TODO update User with contribution list. $addtoset i think
	}
});

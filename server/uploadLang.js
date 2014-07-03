Meteor.methods({
	uploadLang:function(docObject,uname){
		Languages.insert({
			Name: docObject.Name,
			Description: docObject.Description,
			Contributor: uname,
			When: moment().unix()
		});
	}
});

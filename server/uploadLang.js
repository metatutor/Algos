Meteor.methods({
	uploadLang:function(docObject,uname){
		Languages.insert({
			Name: docObject.Name,
			Description: docObject.Description,
			Slug: docObject.Slug,
			Contributor: uname,
			When: moment().unix()
		});
	}
});

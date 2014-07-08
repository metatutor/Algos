Meteor.methods({
	uploadLang:function(docObject,uid){
		Languages.insert({
			Name: docObject.Name,
			Description: docObject.Description,
			Slug: docObject.Slug,
			Contributor: uid,
			When: moment().unix()
		});
	}
});

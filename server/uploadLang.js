Meteor.methods({
	uploadLang:function(docObject,uid){
		Languages.insert({
			Name: docObject.Name,
			Description: docObject.Description,
			Slug: docObject.Slug,
			Contributor: uid,
			When: moment().unix()
		});
	},
	editLang:function(slug,text){
		Languages.update({
			Slug:slug
		},{
			$set:{
				Description:text
			}
		});
	}
});

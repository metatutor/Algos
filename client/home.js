Meteor.startup(function(){
	Session.set("showAmount",5);
});

Template.home.events = {
	'click button[name=show5]': function(){
		Session.set("showAmount",5);
	},
	'click button[name=show10]': function(){
		Session.set("showAmount",10);
	}
}

Template.home.newAlgos = function(){
	var amount = Session.get("showAmount");
	return AlgoPedia.find( {}, {sort: { When: -1},limit:amount});
}

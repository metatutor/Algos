Meteor.startup(function(){
	Session.set("showAmountLSI",5);
});

Template.rAddedLSI.events = {
	'click button[name=show5lsi]': function(){
		Session.set("showAmountLSI",5);
	},
	'click button[name=show10lsi]': function(){
		Session.set("showAmountLSI",10);
	},
	'click button[name=redirect]':function(){
		console.log(this);
		Router.go('lsiSearchRoute',{algo: this.pAiD,lang:_.slugify(this.Language),search:this._id});
	}
}

Template.rAddedLSI.newLSI = function(){
	var amount = Session.get("showAmountLSI");
	return LSIs.find( {}, {sort: { When: -1},limit:amount});
}

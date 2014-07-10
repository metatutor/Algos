Template.userFeed.hasContributions = function(){
	var codes = this.profile.codeContributions;
	var algos = this.profile.algorithmContributions;
	return codes.length+algos.length;
}

Template.userFeed.algo = function(){
	return this.profile.algorithmContributions.reverse();
}

Template.userFeed.code = function(){
	return this.profile.codeContributions.reverse();
}

Template.userFeed.getCode = function(stringy){
	return LSIs.findOne({_id:stringy});
}

Template.userFeed.getAlgo = function(stringy){
	return AlgoPedia.findOne({AiD:stringy});
}

Template.userFeed.events = {
	'click button[name=visitLang]':function(){
		Router.go('lsiSearchRoute',{algo:this.pAiD,lang:'showAll',search:this._id});
	}
}

Template.userFeed.getUsername = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.username;
}

Template.userFeed.getAuthor = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	return user;
}

Template.userFeed.getCodeForm = function(obj){
	return unEscapeHTML(obj.Code);
}

function unEscapeHTML(s) {
	return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/$lt;/g, '<').replace(/$gt;/g, '>');
}

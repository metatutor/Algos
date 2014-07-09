Template.userFeed.hasContributions = function(){
	var codes = this.profile.codeContributions;
	var algos = this.profile.algorithmContributions;
	return codes.length+algos.length;
}

Template.userFeed.algo = function(){
	return this.profile.algorithmContributions;
}

Template.userFeed.code = function(){
	return this.profile.codeContributions;
}

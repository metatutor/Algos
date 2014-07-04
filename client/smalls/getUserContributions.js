Template.getUsersContributions.noContributions = function(){
	var user = this;
	var count = user.profile.algorithmContributions.length;
	if(count===0){
		return true;
	}
	return false;
}

Template.getUsersContributions.getContributions = function(){
	var i =0;
	var cArray = [];
	var uArray = this.profile.algorithmContributions;
	while(i<uArray.length){
		cArray.push(AlgoPedia.findOne({AiD:uArray[i]}));
		i++;
	}
	return cArray;
}

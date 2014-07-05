Template.getUsersContributions.noContributions = function(){
	var user = this;
	var count = user.profile.algorithmContributions.length;
	if(count===0){
		return true;
	}
	return false;
}

Template.getUsersContributions.getAlgoContributions = function(){
	var i =0;
	var cArray = [];
	var uArray = this.profile.algorithmContributions;
	while((i<uArray.length)&&(i<5)){
		cArray.push(AlgoPedia.findOne({AiD:uArray[uArray.length-i-1]}));
		i++;
	}
	return cArray;
}

Template.getUsersContributions.getLangContributions = function(){
	var i =0;
	var cArray = [];
	var lArray = this.profile.languageContributions;
	while((i<uArray.length)&&(i<5)){
		cArray.push(Languages.findOne({Name:lArray[lArray.length-i-1]}));
		i++;
	}
	return cArray;
}

Template.getUsersContributions.getLSIContributions = function(){
	var i =0;
	var cArray = [];
	var lArray = this.profile.lsiContributions;
	while((i<uArray.length)&&(i<5)){
		cArray.push(LSIs.findOne({_id:lArray[lArray.length-i-1]}));
		i++;
	}
	return cArray;
}

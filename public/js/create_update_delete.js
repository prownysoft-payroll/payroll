isCUD = function(num, param){
	if(typeof num == "number")
		num = (num).toString();
	if( typeof num == "string" && num < 8 && num >0)
		return (num.toString(2) & (param).toString(2))? true: false;
	return false;
}

isCUDModeCreate = function(num){
	return isCUD(num, "1")
}

isCUDModeUpdate = function(num){
	return isCUD(num, "2")
}

isCUDModeDelete = function(num){
	return isCUD(num, "4")
}


setCUDModel = function(num, status, mode){
	if(status)
		result = parseInt(num).toString(2) | (mode).toString(2);
	else
		result = parseInt(num).toString(2) ^ (mode).toString(2);
	return result;
}
setCUDModeCreate = function(num, status){
	return parseInt(setCUDModel(num, status, 1),2);
}

setCUDModeUpdate = function(num, status){
	return parseInt(setCUDModel(num, status, 2),2);
}

setCUDModeDelete = function(num, status){
	return parseInt(setCUDModel(num, status, 4),2);
}
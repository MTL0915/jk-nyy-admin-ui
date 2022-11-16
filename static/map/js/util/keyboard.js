define([
	'util/eventManagess'
],function(eventManagess){
	
	var keyCode = [];
	var key = [];
	
	var callback = new eventManagess();
	
	document.addEventListener("keydown",function(e){
		keyCode.indexOf(e.keyCode) == -1 && keyCode.push(e.keyCode); 
		key.indexOf(e.key) == -1 && key.push(e.key);
	});
	
	document.addEventListener("keyup",function(e){
		console.log('keyboard:');
		console.log(key);
		console.log(keyCode);
		keyCode.splice(keyCode.indexOf(e.keyCode),1);
		key.splice(key.indexOf(e.key),1);
		callback.apply(this,arguments);
	});
	
	
	
	return {
		key : key,
		keyCode : keyCode,
		callback : callback
	};
	
})

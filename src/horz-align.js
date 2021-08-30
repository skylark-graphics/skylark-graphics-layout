define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	
	var HorzAlign = ["left","center","right","stretch"];
	
	langx.mixin(HorzAlign,{
		"left" : 0,
		"center": 1 ,
		"right" : 2,
		"stretch" : 3
	});
	

	return layout.HorzAlign = HorzAlign;	
});	

define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	var VertAlign = ["top","center","bottom","stretch"];
	
	langx.mixin(VertAlign,{
		"top" : 0,
		"center" : 1,
		"bottom" : 2,
		"stretch" : 3
	});

	return Alignment;
	
});	

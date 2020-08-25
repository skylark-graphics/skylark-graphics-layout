define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	var AnchorStyle = ["none", "left", "top", "right", "bottom"];
	
	langx.mixin(AnchorStyle,{
		"none" : 0, 
		"left" : 1, 
		"top" : 2, 
		"right" : 3, 
		"bottom" : 4
	});

	return layout.AnchorStyle = AnchorStyle;

});

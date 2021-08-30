define([
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

	var FloatMode = ["none", "left", "right"];

	langx.mixin(FloatMode,{
		"none" : 0, 
		"left" : 1, 
		"right" : 2
	});


	return layout.FloatMode = FloatMode;
});

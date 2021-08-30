define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {
	
	var Direction = ["leftRight","rightLeft","topDown","bottomUp"];

	langx.mixin(Direction,{
		"leftRight" : 0,
		"rightLeft" : 1,
		"topDown" : 2,
		"bottomUp" : 3
	});

	return layout.Direction = Direction;
	
});	

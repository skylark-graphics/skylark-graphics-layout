define([
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

    var PositionMode = ["absolute", "fixed", "relative", "static"];

    langx.mixin(PositionMode,{
    	"absolute" : 0, 
    	"fixed" : 1, 
    	"relative" : 2, 
    	"static" : 3
    });

    return layout.PositionMode = PositionMode;
});

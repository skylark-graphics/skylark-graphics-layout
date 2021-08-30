define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

    var Orientation =  ["horz", "vert"];
    
    langx.mixin(Orientation,{
    	"horz" : 0, 
    	"vert" : 1	
    })

    return layout.Orientation = Orientation;
});

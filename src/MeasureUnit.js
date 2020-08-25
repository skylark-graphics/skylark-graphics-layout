define([
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

	var MeasureUnit = ["em", "ex", "px", "pt", "pc", "cm", "mm", "in"];

	langx.mixin(MeasureUnit,{
		"em" : 0, 
		"ex" : 1, 
		"px" : 2, 
		"pt" : 3, 
		"pc" : 4, 
		"cm" : 5, 
		"mm" : 6, 
		"in" : 7
	});

	return layout.MeasureUnit = MeasureUnit;

});

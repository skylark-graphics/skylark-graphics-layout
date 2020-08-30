define([
	"skylark-langx/langx",
	"./layout",
	"./DisplayMode",
	"./FloatMode",
	"./PositionMode"
],function(langx,layout,DisplayMode,FloatMode,PositionMode) {

	var Flow = langx.klass({
		
		"klassName"	:	"Flow",

		"display"	:	{
			get : function() {
				return this._.display;
			}
		},

		"float"	:	{
			get : function() {
				return this._.float;
			}
		},

		"position"	:	{
			get : function() {
				return this._.position;
			}
		},

		toCss : function(css) {
			return Flow.toCss(this,css);
		},
		
		"_construct" : function(params){
			this._ = {
				display   : langx.isString(params.display) ? DisplayMode[params.display] : params.display,
				float 	  : langx.isString(params.float) ? FloatMode[params.float] : params.float,
				position  : langx.isString(params.position) ? PositionMode[params.position] : params.position

			};
		}
	});

	Flow.fromPlain = function(o) {
		return new Flow({
			display  : o.display,
			float    : o.float,
			position : o.position
		});
	};

	Flow.fromCss = Flow.fromPlain;

	Flow.toCss = function(flow,css) {
        if (!css) {
        	css = {};
        }
    	if (flow.display) {
        	css.display = DisplayMode.toCss(flow.display);
    	}
    	if (flow.repeat) {
        	css.float = FloatMode[flow.float]; // flow.float.toString();
    	}
    	if (flow.position) {
        	css.position = PositionMode[flow.position]; //flow.position.toString();
    	}

        return css;
	};

	return layout.Flow = Flow;
	
});	

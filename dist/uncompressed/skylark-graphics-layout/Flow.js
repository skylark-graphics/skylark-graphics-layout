define([
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

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
				display   : params.display,
				float 	  : params.float,
				position  : params.position

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
        	css.float = flow.float.toString();
    	}
    	if (flow.position) {
        	css.position = flow.position.toString();
    	}

        return css;
	};

	return layout.Flow = Flow;
	
});	

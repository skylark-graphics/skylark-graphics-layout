define([
    "skylark-langx/langx",
	"skylark-langx-numbers/Vector2",    
    "./layout"
],function(langx, Vector2,layout) {

    var Location =  Vector2.inherit({

        "klassName": "Location",

        "left": {
            get : function() {
                return this.x;
            },

            set : function(v) {
            	this.x = v;
            }

        },

        "top": {
            get : function() {
                return this.y;
            },

            set : function(v) {
            	this.y = v;
            }

        }
	});

	return layout.Location = Location;

});

define([
    "skylark-langx/langx",
	"skylark-langx-numerics/Vector2",   
	"skylark-langx-measures/MeasureValue",
    "./layout"
],function(langx, Vector2,MeasureValue,layout) {

    var Size = Vector2.inherit({
        "klassName": "Size",
		// width: Number
		//		The width of the default rectangle, value 100.
		"width" : {
			get : function() {
				return this._.width;
			}
		},
		// height: Number
		//		The height of the default rectangle, value 100.
		"height" : {
			get : function() {
				return this._.height;
			}
		},

		"clone"	: function(){
			var _ = this._;
			return new Size(_.width,_.height);
		},

        "toArray" : function() {
            return [this.width,this.height];
        },

        "toPlain" : function() {
            return {
                "width"  : this.width,
                "height"  : this.height
            };
        },
        "toString": function() {
        	return this.width +"," + this.height;
        },

        "init" : function(width,height) {
        	var _ = this._ = {};
        	_.width = width || 0;
        	_.height = height || 0;
        }
	});

	Size.fromString = function(s) {
		var a = s.split(" ");
        for (var i = 0; i<a.length;i++) {
            if (a[i]== "null") {
                a[i] = null;
            } else if (a[i] == "undefined") {
                a[i] = undefined;
            }
        }
        return Size.fromArray(a);
	};

	Size.fromPlain = function(o) {
        var width = o.width || o.w,
            height = o.height || o.h;
//        width = width ? width : MeasureValue.auto;
//        height = height ? height : MeasureValue.auto;

		return new Size(width,height);
	};

	Size.fromArray = function(a) {
		return new Size(a[0],a.length>1?a[1]:a[0]);
	};

    Size.fromCss = function(css) {
        return Size.fromPlain(css);
    };

    Size.toCss = function(size,css) {
        if (!css) {
            css = {};
        }
        if (size) {
            var width = size.width,
                height = size.height;

            if (width) {
                css.width = width.toString();
            }
            if (height) {
                css.height = height.toString();
            }
        }

        return css;
    };    

    Size.auto = new Size(
        MeasureValue.auto,
        MeasureValue.auto
    );

/*
	Size.fromString = function(s) {
		var a = s.split(",");
		return new Size(parseFloat(a[0]),parseFloat(a[1]));
	};

	Size.fromPlain = function(o) {
		return new Size(o.w || o.width,o.h || o.height);
	};

	Size.fromArray = function(a) {
		return new Size(a[0],a[1]);
	};
*/

	Size.Zero = new Size(0,0);
	
	return  layout.Size = Size;
	
});	

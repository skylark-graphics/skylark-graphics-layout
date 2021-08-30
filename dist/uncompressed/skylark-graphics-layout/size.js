define([
    "skylark-langx/langx",
	"skylark-langx-measures/measure-value",
    "./layout"
],function(langx, MeasureValue,layout) {

    var Size = langx.klass({
        "klassName": "Size",
		// width: Number
		//		The width of the default rectangle, value 100.
		"width" : {
			get : function() {
				return this._.width;
			},
            set : function(v) {
                this._.width = MeasureValue.parse(v);
            }
		},
		// height: Number
		//		The height of the default rectangle, value 100.
		"height" : {
			get : function() {
				return this._.height;
			},
            set : function(v) {
                this._.height = MeasureValue.parse(v);
            }
		},

		"clone"	: function(){
			return new Size(this.width,this.height);
		},

        "toArray" : function() {
            return [this.width,this.height];
        },

        "toPlain" : function() {
            return {
                "width"  : this.width.toStrng(),
                "height"  : this.height.toString()
            };
        },

        "toString": function() {
        	return this.width.toString() +" " + this.height.toString();
        },

        "_construct" :function(width, height) {
            this._ = {
                "width": MeasureValue.parse(width),
                "height": MeasureValue.parse(height)
            };
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

	
	return  layout.Size = Size;
	
});	

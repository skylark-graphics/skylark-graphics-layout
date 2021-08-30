define([
    "skylark-langx/langx",
    "skylark-langx-measures/measure-value",
    "./layout"
],function(langx,MeasureValue, layout) {

    var Location =  langx.klass({

        "klassName": "Location",

        "x": {
            get : function() {
                return this._.x;
            },

            set : function(v) {
            	this._.x = MeasureValue.parse(v);
            }

        },

        "y": {
            get : function() {
                return this._.y;
            },

            set : function(v) {
            	this._.y = MeasureValue.parse(v);
            }

        },

        "clone" : function(){
            return new Location(this.x,this.y);
        },

        "toArray" : function() {
            return [this.x,this.y];
        },

        "toPlain" : function() {
            return {
                "x"  : this.x,
                "y"  : this.y
            };
        },
        "toString": function() {
            return this.x +"," + this.y;
        },

        toCss: function(css) {
            return Location.toCss(this, css);
        },

        "_construct" : function(x, y) {
            this._ = {
                "x": MeasureValue.parse(x),
                "y": MeasureValue.parse(y)
            };
        }

	});



    Location.fromString = function(s) {
        var a = s.split(",");
        return Location.fromArray(a);
    };

    Location.fromPlain = function(o) {
        var x = o.x || o.l || o.left,
            y = o.y || o.t || o.top;
//        x = x ? x : MeasureValue.auto;
//        y = y ? y : MeasureValue.auto;
        return new Location(x, y);
    };

    Location.fromArray = function(a) {
        return new Location(a[0], a.length > 1 ? a[1] : undefined);
    };

    Location.fromCss = function(css) {
        return Point.fromPlain({
            x: css.left,
            y: css.top
        });
    };

    Location.toCss = function(loc, css) {
        if (!css) {
            css = {};
        }
        css.left = loc.x && loc.x.toString();
        css.top = loc.y && loc.y.toString();

        return css;
    };


	return layout.Location = Location;

});

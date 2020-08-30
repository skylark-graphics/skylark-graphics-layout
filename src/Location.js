define([
    "skylark-langx/langx",
    "skylark-langx-numerics/Vector2",    
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

        },

        "clone" : function(){
            return new Location(this.left,this.top);
        },

        "toArray" : function() {
            return [this.left,this.top];
        },

        "toPlain" : function() {
            return {
                "left"  : this.left,
                "top"  : this.top
            };
        },
        "toString": function() {
            return this.left +"," + this.top;
        },

        toCss: function(css) {
            return Location.toCss(this, css);
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

define([
    "skylark-langx/langx",
    "skylark-langx-measures/MeasureValue",
    "./layout"
],function(langx,MeasureValue,layout) {

    var Restriction = langx.klass({
        "klassName": "Restriction",


        "maxHeight": {
            get : function() {
                return this._.maxHeight;
            }
        },
        "maxWidth": {
            get : function() {
                return this._.maxWidth;
            }
        },
        "minHeight": {
            get : function() {
                return this._.minHeight;
            }
        },
        "minWidth": {
            get : function() {
                return this._.minWidth;
            }
        },

        toCss : function(css) {
            return Restriction.toCss(this,css);
        },
       toString: function(){
            var minWidth  = this.minWidth,
                minHeight = this.minHeight,
                maxWidth = this.maxWidth,
                maxHeight = this.maxHeight;
               
            return minWidth.toString() + " " + 
                   minHeight.toString() + " " +
                   maxWidth.toString() + " " + 
                   maxHeight.toString();
        },
        "_consturct" :   function(minWidth, minHeight,maxWidth, maxHeight) {
            this._ = {
                "minWidth": minWidth,
                "minHeight": minHeight,
                "maxWidth": maxWidth,
                "maxHeight": maxHeight
            };
        }

    });

    Restriction.fromString = function(s) {
        var a = s.split(" ");
        return Restriction.fromArray(a);
    };

    Restriction.fromPlain = function(o) {
        var minWidth = o.minWidth,
            minHeight = o.minHeight,
            maxWidth = o.maxWidth,
            maxHeight = o.maxHeight;
        minWidth = minWidth ? minWidth : MeasureValue.none;
        minHeight = minHeight ? minHeight : MeasureValue.none;
        maxWidth = maxWidth ? maxWidth : MeasureValue.none;
        maxHeight = maxHeight ? maxHeight : MeasureValue.none;

        return new Restriction(minWidth, minHeight,maxWidth, maxHeight);
    };

    Restriction.fromArray = function(a) {
        return new Restriction(a.length>0?a[0]:MeasureValue.none,
                               a.length>1?a[1]:MeasureValue.none,
                               a.length>2?a[2]:MeasureValue.none,
                               a.length>3?a[3]:MeasureValue.none
                    );
    };

    Restriction.fromCss = function(css) {
        return Restriction.fromPlain(css);
    };
    Restriction.toCss = function(restriction,css) {
        if (!css) {
            css = {};
        }
        if (restriction) {
            var maxWidth = restriction.maxWidth,
                maxHeight = restriction.maxHeight,
                minWidth = restriction.minWidth,
                minHeight = restriction.minHeight;

            if (maxWidth) {
                css.maxWidth = maxWidth.type === MeasureType.none ? "" : maxWidth.toString();
            }
            if (maxHeight) {
                css.maxHeight = maxHeight.type === MeasureType.none ? "" :maxHeight.toString();
            }

            if (minWidth) {
                css.minWidth = minWidth.type === MeasureType.none ? "" :minWidth.toString();
            }
            if (minHeight) {
                css.minHeight = minHeight.type === MeasureType.none ? "" :minHeight.toString();
            }
        }

        return css;
    };    

    Restriction.none = new Restriction(
        MeasureValue.none,
        MeasureValue.none,
        MeasureValue.none,
        MeasureValue.none
    );
    return Restriction;
    
}); 

define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d*\D*\s*/g;

    var Margin = langx.klass({

        "klassName": "Margin",

        "left": {
            get : function() {
                return this._.left;
            }
       },

        "top": {
            get : function() {
                return this._.top;
            }
        },

        "right": {
            get : function() {
                return this._.right;
            }
        },

        "bottom": {
            get : function() {
                return this._.bottom;
            }
        },

        getAll: function() {
            if (this.left == this.bottom && this.top == this.right && this.right == this.left) {
                return this.left;
            } else {
                return null;
            }
        },

        setAll: function(a) {
            this._ = {
                "left": a,
                "right": a,
                "top": a,
                "bottom": a
            };
        },
        
        "clone" : function(){
            var _ = this._;
            return new Padding(_.top,_.right,_.left,_.bottom);
        
        },

        equale: function(target) {
            return this.left == target.left &&
                this.top == target.top &&
                this.right == target.right &&
                this.bottom == target.bottom;
        },

        equale: function(target) {
            return this.left == target.left &&
                this.top == target.top &&
                this.right == target.right &&
                this.bottom == target.bottom;
        },

        toArray : function() {
            return [this.top,this.right,this.left,this.bottom];
        },

        toPlain : function() {
            return {
                "top"  : this.top,
                "right"  : this.right,
                "left"  : this.left,
                "bottom"  : this.bottom
            }
        },

        toCss : function(css) {
            return Padding.toCss(this,css);
        },

        "toString": function() {
            var count = 0,
                l = this.left.toString(),
                t = this.top.toString(),
                r = this.right.toString(),
                b = this.bottom.toString();
            if (r == l) {
                if (t == b) {
                    if (t == r) {
                        return t.toString();
                    } else {
                        return t + " " + r;
                    }
                } else {
                    return t + " " + r + " " + b;
                }
            } else {
                return t + " " + r + " " + l + " " + b;
            }

        },
        
        "_construct"    :   function(/*Number*/t, /*Number*/r, /*Number*/l, /*Number*/b) {
            if (b === undefined) {
                if (l === undefined) {
                    if (r === undefined) {
                        if (t === undefined) {
                            //()
                            b=l=r=t=0;
                        } else {
                            // /*Number*/a
                            b=l=r=t;
                        }
                    } else {
                        // /*Number*/tb,/*Number*/lr
                        b = t;
                        l = r;
                    }

                } else {
                    // /*Number*/t,/*Number*/lr,/*Number*/b 
                    b = l;
                    l = r;
                } 
            }
            this._ = {
                "left": l,
                "right": r,
                "top": t,
                "bottom": b
            };
        }
    });

    Object.mixin(Margin, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new Margin(a[0],a[0],a[0],a[0]);
                case 2 : return new Margin(a[0],a[1],a[1],a[0]);
                case 3 : return new Margin(a[0],a[1],a[1],a[0]);
                case 4 : return new Margin(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new Margin(o.t,o.r,o.l,o.b);
        },
        "fromString": function(s) {
           var a = s.match(_WIDTHS_R);
            var t,
                r,
                l,
                b,
                len = a.length;
            //for (var i = 0; i < len; i++) {
            //    a[i] = _WIDTH_R.exec(a[i]);
            //    a[i] = parseInt(a[i]);
            //}
            switch (len) {
                case 1:
                    t = r = l = b = a[0];
                    break;

                case 2:
                    t = b = a[0];
                    r = l = a[1];
                    break;
                case 3:
                    t = a[0];
                    r = l = a[1];
                    b = a[2]
                    break;
                case 4:
                    t = a[0];
                    r = a[1];
                    l = a[2]
                    b = a[3];
                    break;
            }
            return new Margin(t,r,l,b);
        },

        Zero: new Margin(0)
    });

    Margin.fromCss = function(css) {
       return new Margin(
                    css.marginTop,
                    css.marginRight,
                    css.marginLeft,
                    css.marginBottom
                );
    };

    Margin.toCss = function(margin,css) {
        if (!css) {
            css = {};
        }
        css.marginTop = margin.top.toString();
        css.marginRight = margin.right.toString();
        css.marginLeft = margin.left.toString();
        css.marginBottom = margin.bottom.toString();

        return css;
    };


    return Margin;
});

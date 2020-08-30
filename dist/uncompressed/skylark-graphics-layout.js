/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-graphics-layout/layout',[
    "skylark-langx/skylark",
    "skylark-langx/langx"
], function(skylark, langx) {
	
	var layout =  {

	  log2 : function (x) {
	    var n = 1, i = 0;
	    while (x > n) {
	      n <<= 1;
	      i++;
	    }
	    return i;
	  }

	};


	return skylark.attach("graphics.layout",layout);
});
define('skylark-graphics-layout/AnchorStyle',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	var AnchorStyle = ["none", "left", "top", "right", "bottom"];
	
	langx.mixin(AnchorStyle,{
		"none" : 0, 
		"left" : 1, 
		"top" : 2, 
		"right" : 3, 
		"bottom" : 4
	});

	return layout.AnchorStyle = AnchorStyle;

});

define('skylark-graphics-layout/Location',[
    "skylark-langx/langx",
    "skylark-langx-measures/MeasureValue",
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

define('skylark-graphics-layout/Size',[
    "skylark-langx/langx",
	"skylark-langx-measures/MeasureValue",
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

define('skylark-graphics-layout/Bounds',[
    "skylark-langx/langx",
    "./layout",
    "./Location",
    "./Size"
],function(langx,layout,Location,Size) {

    var Bounds = langx.klass({
        "klassName": "Bounds",
        "bounds": {
            get : function() {
                // summary:
                //		returns the bounding box
                var 
                    _ = this._,
                    box = {
                    x: _.x,
                    y: this.y,
                    width: _.width,
                    height: _.height
                };
                return box;
            }
        },
       "x": {
            get : function() {
                return this._.x;
            }
        },
        // y: Number
        //		The Y coordinate of the default rectangle's position, value 0.
        "y": {
            get : function() {
                return this._.y;
            }
        },
        // width: Number
        //		The width of the default rectangle, value 100.
        "width": {
            get : function() {
                return this._.width;
            }
        },
        // height: Number
        //		The height of the default rectangle, value 100.
        "height": {
            get : function() {
                return this._.height;
            }
        },
        // r: Number
        //		The corner radius for the default rectangle, value 0.
        "radius": {
            get : function() {
                return this._.radius;
            }
        },
        "leftTop": {
            get: function() {
                var _ = this._;
                return new Location(_.x, _.y);
            }
        },
        "leftBottom": {
            get: function() {
                var _ = this._;
                return new Location(_.x, _.y + _.height);
            }
        },
        "rightTop": {
            get: function() {
                var _ = this._;
                return new Location(_.x + _.width, _.y);
            }
        },
        "rightBottom": {
            get: function() {
                var _ = this._;
                return new Location(_.x + _.width, _.y + _.height);
            }
        },

        "size": {
            get: function() {
                var _ = this._;
                return new Size(_.width, _.height);
            }
        },

        "move": function(dx, dy) {
            var _ = this._;
            return new Bounds(_.x + dx,_.y + dy,_.width,_.height,_.radius);
        },

        "containPoint": function(x,y) {
            // support function(p)
            if (y === undefined) {
                var p = x;
                x = p.x;
                y = p.y;
            }
            var _ = this._;

            return (x >= _.x) && (x < _.x + _.width) && (y >= _.y) && (y < _.y + _.height);
        },

		"isEmpty"	:	function(){
			return this.width <=0 || this.height<=0;
		},
		
		"notEqual"	:	function(/*Bounds*/r) {
			return !r || r.x != this.x || r.y != this.y || r.width != this.width || r.height != this.height || r.radius != this.radius;
		},
		
		"equal"	:	function(/*Bounds*/r){
			return  !this.notEqual(r);
		},
		
		"isIntersect"	:function(/*Number*/x2,/*Number*/y2,/*Number*/width2,/*Number*/height2){
			var x1 = this.x1,y1=this.y,width1=this.width,height1=this.height;
			 
		    return (Math.min(x1 + width1, x2 + width2) - (x1 > x2 ? x1 : x2)) > 0 &&
		           (Math.min(y1 + height1, y2 + height2) - (y1 > y2 ? y1 : y2)) > 0;
		},
		
		"intersect"	:	function(/*Number*/x2,/*Number*/y2,/*Number*/width2,/*Number*/height2){
			var x1 = this.x1,y1=this.y,width1=this.width,height1=this.height;
			 
		    return (Math.min(x1 + width1, x2 + width2) - (x1 > x2 ? x1 : x2)) > 0 &&
		           (Math.min(y1 + height1, y2 + height2) - (y1 > y2 ? y1 : y2)) > 0;
		},
						
		"unite"	: function(/*Number*/x2,/*Number*/y2,/*Number*/width2,/*Number*/height2){
			var x1 = this.x1,y1=this.y,width1=this.width,height1=this.height;
			 
			var x = x1 < x2 ? x1 : x2,
				y = y1 < y2 ? y1 : y2,
				width  = Math.max(x1 + width1, x2 + width2) - x;
				height = Math.max(y1 + height1, y2 + height2) - y;
		    
		    return new Bounds(x,y,width,height);
		},
		
		"clone"	: function(){
			var _ = this._;
			return new Bounds(_.x,_.y,_.width,_.height,_.radius);
		},

        "init" : function(x, y, width, height, radius) {
            var _ = this._ = {};
            _.x = x || 0;
            _.y = y || 0;
            _.width = width || 0;
            _.height = height || 0;
            _.radius = radius || 0;
        }
    });


	Bounds.fromString = function(s) {
		var a = s.split(",");
		return new Bounds(parseFloat(a[0]),parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]));
	};

	Bounds.fromPlain = function(o) {
		return new Bounds(o.x || o.l,o.y || o.t, o.w || o.width,o.h || o.height);
	};

	Bounds.fromArray = function(a) {
		return new Bounds(a[0],a[1],a[2],a[3]);
	};
	
	Bounds.Zero = new Bounds(0,0,0,0);
	

	return layout.Bounds = Bounds;
	
});	

define('skylark-graphics-layout/Direction',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {
	
	var Direction = ["leftRight","rightLeft","topDown","bottomUp"];

	langx.mixin(Direction,{
		"leftRight" : 0,
		"rightLeft" : 1,
		"topDown" : 2,
		"bottomUp" : 3
	});

	return layout.Direction = Direction;
	
});	

define('skylark-graphics-layout/DisplayMode',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

    var DisplayMode = ["none", "inline", "block", "listtem", "inlineblock", "tableRowGroup", "tablecell", "tablerow"];

    langx.mixin(DisplayMode,{
        "none" : 0, 
        "inline" : 1, 
        "block" : 2, 
        "listtem" : 3, 
        "inlineblock" :4, 
        "tableRowGroup" : 5, 
        "tablecell" : 6, 
        "tablerow" : 7
    });

    DisplayMode.fromCss = function(s) {
        switch (s) {
            case "none":
                return DisplayMode.none;
            case "inline":
                return DisplayMode.inline;
            case "block":
                return DisplayMode.block;
            case "list-item":
                return DisplayMode.listtem;
            case "inline-block":
                return DisplayMode.inlineblock;
            case "table-cell":
                return DisplayMode.tablecell;
            case "table-row":
                return DisplayMode.tablerow;
            case "table-row-group":
                return DisplayMode.tableRowGroup
            default:
                return undefined;
        }
    };
    
    DisplayMode.toCss = function(mode) {
        switch (mode) {
            case DisplayMode.none:
                return "none";
            case DisplayMode.inline:
                return "inline";
            case DisplayMode.block:
                return "block";
            case DisplayMode.listtem:
                return "list-item";
            case DisplayMode.inlineblock:
                return "inline-block";
            case DisplayMode.tablecell:
                return "table-cell";
            case DisplayMode.tablerow:
                return "table-row";
            case DisplayMode.tableRowGroup:
                return "table-row-group";
            default:
                return undefined;
        }
    };

    return layout.DisplayMode = DisplayMode;

});

define('skylark-graphics-layout/FloatMode',[
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

	var FloatMode = ["none", "left", "right"];

	langx.mixin(FloatMode,{
		"none" : 0, 
		"left" : 1, 
		"right" : 2
	});


	return layout.FloatMode = FloatMode;
});

define('skylark-graphics-layout/PositionMode',[
	"skylark-langx/langx",
	"./layout"
],function(langx,layout) {

    var PositionMode = ["absolute", "fixed", "relative", "static"];

    langx.mixin(PositionMode,{
    	"absolute" : 0, 
    	"fixed" : 1, 
    	"relative" : 2, 
    	"static" : 3
    });

    return layout.PositionMode = PositionMode;
});

define('skylark-graphics-layout/Flow',[
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

define('skylark-graphics-layout/HorzAlign',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	
	var HorzAlign = ["left","center","right","stretch"];
	
	langx.mixin(HorzAlign,{
		"left" : 0,
		"center": 1 ,
		"right" : 2,
		"stretch" : 3
	});
	

	return layout.HorzAlign = HorzAlign;	
});	

define('skylark-graphics-layout/Margin',[
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

    langx.mixin(Margin, {
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

define('skylark-graphics-layout/Padding',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {
    var _WIDTH_R = /\d+/,
        _WIDTHS_R = /\d*\D*\s*/g;

    var Padding = langx.klass({
        "klassName": "Padding",


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

    langx.mixin(Padding, {
        "fromArray" : function(a) {
            switch (a.length) {
                case 1 : return new Padding(a[0],a[0],a[0],a[0]);
                case 2 : return new Padding(a[0],a[1],a[1],a[0]);
                case 3 : return new Padding(a[0],a[1],a[1],a[0]);
                case 4 : return new Padding(a[0],a[1],a[1],a[0]);
                default : return;
            }
        },
        "fromPlain" : function(o) {
            return new Padding(o.t,o.r,o.l,o.b);
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
            return new Padding(t,r,l,b);
        },

        Zero: new Padding(0)
    });

    Padding.fromCss = function(css) {
       return new Padding(
                    css.paddingTop,
                    css.paddingRight,
                    css.paddingLeft,
                    css.paddingBottom
                );
    };

    Padding.toCss = function(padding,css) {
        if (!css) {
            css = {};
        }
        if (padding) {
            css.paddingTop = padding.top.toString();
            css.paddingRight = padding.right.toString();
            css.paddingLeft = padding.left.toString();
            css.paddingBottom = padding.bottom.toString();
        }

        return css;
    };

    return Padding;
});

define('skylark-graphics-layout/Restriction',[
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

define('skylark-graphics-layout/VertAlign',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

	var VertAlign = ["top","center","bottom","stretch"];
	
	langx.mixin(VertAlign,{
		"top" : 0,
		"center" : 1,
		"bottom" : 2,
		"stretch" : 3
	});

	return Alignment;
	
});	

define('skylark-graphics-layout/main',[
    "./layout",
    "./AnchorStyle",
    "./Bounds",
    "./Direction",
    "./DisplayMode",
    "./FloatMode",
    "./Flow",
    "./HorzAlign",
    "./Location",
    "./Margin",
    "./Padding",
    "./PositionMode",
    "./Restriction",
    "./Size",
    "./VertAlign"
], function(layout) {

	return layout;
});
define('skylark-graphics-layout', ['skylark-graphics-layout/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-graphics-layout.js.map

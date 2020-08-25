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

define('skylark-langx-numbers/Vector2',[
	"./numbers"
] ,function(numbers) {


	function Vector2( x, y ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	Object.defineProperties( Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function ( value ) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function ( value ) {

				this.y = value;

			}

		}

	} );

	Object.assign( Vector2.prototype, {

		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},


		clone: function () {

			return new this.constructor( this.x, this.y );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function ( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		},

		clampScalar: function ( minVal, maxVal ) {

			this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
			this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

			return this;

		},

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function ( v ) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2( - this.y, - this.x ) + Math.PI;

			return angle;

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		},


		rotateAround: function ( center, angle ) {

			var c = Math.cos( angle ), s = Math.sin( angle );

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	} );


	return numbers.Vector2 = Vector2 ;
});

define('skylark-graphics-layout/Location',[
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

define('skylark-graphics-layout/Size',[
    "skylark-langx/langx",
	"skylark-langx-numbers/Vector2",    
    "./layout"
],function(langx, Vector2,layout) {

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
		var a = s.split(",");
		return new Size(parseFloat(a[0]),parseFloat(a[1]));
	};

	Size.fromPlain = function(o) {
		return new Size(o.w || o.width,o.h || o.height);
	};

	Size.fromArray = function(a) {
		return new Size(a[0],a[1]);
	};

	Size.Zero = new Size(0,0);
	
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

define('skylark-graphics-layout/Flow',[
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

define('skylark-graphics-layout/Restriction',[
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

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

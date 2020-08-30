/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-numerics/Vector2","./layout"],function(t,n,r){var o=n.inherit({klassName:"Location",left:{get:function(){return this.x},set:function(t){this.x=t}},top:{get:function(){return this.y},set:function(t){this.y=t}},clone:function(){return new o(this.left,this.top)},toArray:function(){return[this.left,this.top]},toPlain:function(){return{left:this.left,top:this.top}},toString:function(){return this.left+","+this.top},toCss:function(t){return o.toCss(this,t)}});return o.fromString=function(t){var n=t.split(",");return o.fromArray(n)},o.fromPlain=function(t){var n=t.x||t.l||t.left,r=t.y||t.t||t.top;return new o(n,r)},o.fromArray=function(t){return new o(t[0],t.length>1?t[1]:void 0)},o.fromCss=function(t){return Point.fromPlain({x:t.left,y:t.top})},o.toCss=function(t,n){return n||(n={}),n.left=t.x&&t.x.toString(),n.top=t.y&&t.y.toString(),n},r.Location=o});
//# sourceMappingURL=sourcemaps/Location.js.map

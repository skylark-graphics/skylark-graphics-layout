/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-measures/measure-value","./layout"],function(t,n,r){var i=t.klass({klassName:"Location",x:{get:function(){return this._.x},set:function(t){this._.x=n.parse(t)}},y:{get:function(){return this._.y},set:function(t){this._.y=n.parse(t)}},clone:function(){return new i(this.x,this.y)},toArray:function(){return[this.x,this.y]},toPlain:function(){return{x:this.x,y:this.y}},toString:function(){return this.x+","+this.y},toCss:function(t){return i.toCss(this,t)},_construct:function(t,r){this._={x:n.parse(t),y:n.parse(r)}}});return i.fromString=function(t){var n=t.split(",");return i.fromArray(n)},i.fromPlain=function(t){var n=t.x||t.l||t.left,r=t.y||t.t||t.top;return new i(n,r)},i.fromArray=function(t){return new i(t[0],t.length>1?t[1]:void 0)},i.fromCss=function(t){return Point.fromPlain({x:t.left,y:t.top})},i.toCss=function(t,n){return n||(n={}),n.left=t.x&&t.x.toString(),n.top=t.y&&t.y.toString(),n},r.Location=i});
//# sourceMappingURL=sourcemaps/location.js.map

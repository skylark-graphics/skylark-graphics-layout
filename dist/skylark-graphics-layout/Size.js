/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-numerics/Vector2","skylark-langx-measures/MeasureValue","./layout"],function(t,n,i,r){var e=n.inherit({klassName:"Size",width:{get:function(){return this._.width}},height:{get:function(){return this._.height}},clone:function(){var t=this._;return new e(t.width,t.height)},toArray:function(){return[this.width,this.height]},toPlain:function(){return{width:this.width,height:this.height}},toString:function(){return this.width+","+this.height},init:function(t,n){var i=this._={};i.width=t||0,i.height=n||0}});return e.fromString=function(t){for(var n=t.split(" "),i=0;i<n.length;i++)"null"==n[i]?n[i]=null:"undefined"==n[i]&&(n[i]=void 0);return e.fromArray(n)},e.fromPlain=function(t){var n=t.width||t.w,i=t.height||t.h;return new e(n,i)},e.fromArray=function(t){return new e(t[0],t.length>1?t[1]:t[0])},e.fromCss=function(t){return e.fromPlain(t)},e.toCss=function(t,n){if(n||(n={}),t){var i=t.width,r=t.height;i&&(n.width=i.toString()),r&&(n.height=r.toString())}return n},e.auto=new e(i.auto,i.auto),e.Zero=new e(0,0),r.Size=e});
//# sourceMappingURL=sourcemaps/Size.js.map

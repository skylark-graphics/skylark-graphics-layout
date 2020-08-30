/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-measures/MeasureValue","./layout"],function(n,t,i){var e=n.klass({klassName:"Restriction",maxHeight:{get:function(){return this._.maxHeight}},maxWidth:{get:function(){return this._.maxWidth}},minHeight:{get:function(){return this._.minHeight}},minWidth:{get:function(){return this._.minWidth}},toCss:function(n){return e.toCss(this,n)},toString:function(){var n=this.minWidth,t=this.minHeight,i=this.maxWidth,e=this.maxHeight;return n.toString()+" "+t.toString()+" "+i.toString()+" "+e.toString()},_consturct:function(n,t,i,e){this._={minWidth:n,minHeight:t,maxWidth:i,maxHeight:e}}});return e.fromString=function(n){var t=n.split(" ");return e.fromArray(t)},e.fromPlain=function(n){var i=n.minWidth,r=n.minHeight,o=n.maxWidth,h=n.maxHeight;return i=i||t.none,r=r||t.none,o=o||t.none,h=h||t.none,new e(i,r,o,h)},e.fromArray=function(n){return new e(n.length>0?n[0]:t.none,n.length>1?n[1]:t.none,n.length>2?n[2]:t.none,n.length>3?n[3]:t.none)},e.fromCss=function(n){return e.fromPlain(n)},e.toCss=function(n,t){if(t||(t={}),n){var i=n.maxWidth,e=n.maxHeight,r=n.minWidth,o=n.minHeight;i&&(t.maxWidth=i.type===MeasureType.none?"":i.toString()),e&&(t.maxHeight=e.type===MeasureType.none?"":e.toString()),r&&(t.minWidth=r.type===MeasureType.none?"":r.toString()),o&&(t.minHeight=o.type===MeasureType.none?"":o.toString())}return t},e.none=new e(t.none,t.none,t.none,t.none),e});
//# sourceMappingURL=sourcemaps/Restriction.js.map

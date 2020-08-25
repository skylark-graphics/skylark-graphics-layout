/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./layout"],function(e,n){var t=e.klass({klassName:"Restriction",maxHeight:{get:function(){return this._.maxHeight}},maxWidth:{get:function(){return this._.maxWidth}},minHeight:{get:function(){return this._.minHeight}},minWidth:{get:function(){return this._.minWidth}},toCss:function(e){return t.toCss(this,e)},toString:function(){var e=this.minWidth,n=this.minHeight,t=this.maxWidth,i=this.maxHeight;return e.toString()+" "+n.toString()+" "+t.toString()+" "+i.toString()},_consturct:function(e,n,t,i){this._={minWidth:e,minHeight:n,maxWidth:t,maxHeight:i}}});return t.fromString=function(e){var n=e.split(" ");return t.fromArray(n)},t.fromPlain=function(e){var n=e.minWidth,i=e.minHeight,r=e.maxWidth,a=e.maxHeight;return n=n||MeasureValue.none,i=i||MeasureValue.none,r=r||MeasureValue.none,a=a||MeasureValue.none,new t(n,i,r,a)},t.fromArray=function(e){return new t(e.length>0?e[0]:MeasureValue.none,e.length>1?e[1]:MeasureValue.none,e.length>2?e[2]:MeasureValue.none,e.length>3?e[3]:MeasureValue.none)},t.fromCss=function(e){return t.fromPlain(e)},t.toCss=function(e,n){if(n||(n={}),e){var t=e.maxWidth,i=e.maxHeight,r=e.minWidth,a=e.minHeight;t&&(n.maxWidth=t.type===MeasureType.none?"":t.toString()),i&&(n.maxHeight=i.type===MeasureType.none?"":i.toString()),r&&(n.minWidth=r.type===MeasureType.none?"":r.toString()),a&&(n.minHeight=a.type===MeasureType.none?"":a.toString())}return n},t.none=new t(MeasureValue.none,MeasureValue.none,MeasureValue.none,MeasureValue.none),t});
//# sourceMappingURL=sourcemaps/Restriction.js.map

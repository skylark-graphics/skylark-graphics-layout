/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-measures/measure-value","./layout"],function(t,i,n){var r=t.klass({klassName:"Size",width:{get:function(){return this._.width},set:function(t){this._.width=i.parse(t)}},height:{get:function(){return this._.height},set:function(t){this._.height=i.parse(t)}},clone:function(){return new r(this.width,this.height)},toArray:function(){return[this.width,this.height]},toPlain:function(){return{width:this.width.toStrng(),height:this.height.toString()}},toString:function(){return this.width.toString()+" "+this.height.toString()},_construct:function(t,n){this._={width:i.parse(t),height:i.parse(n)}}});return r.fromString=function(t){for(var i=t.split(" "),n=0;n<i.length;n++)"null"==i[n]?i[n]=null:"undefined"==i[n]&&(i[n]=void 0);return r.fromArray(i)},r.fromPlain=function(t){var i=t.width||t.w,n=t.height||t.h;return new r(i,n)},r.fromArray=function(t){return new r(t[0],t.length>1?t[1]:t[0])},r.fromCss=function(t){return r.fromPlain(t)},r.toCss=function(t,i){if(i||(i={}),t){var n=t.width,r=t.height;n&&(i.width=n.toString()),r&&(i.height=r.toString())}return i},r.auto=new r(i.auto,i.auto),n.Size=r});
//# sourceMappingURL=sourcemaps/size.js.map

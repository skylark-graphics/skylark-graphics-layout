/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-numbers/Vector2","./layout"],function(t,i,n){var r=i.inherit({klassName:"Size",width:{get:function(){return this._.width}},height:{get:function(){return this._.height}},clone:function(){var t=this._;return new r(t.width,t.height)},toArray:function(){return[this.width,this.height]},toPlain:function(){return{width:this.width,height:this.height}},toString:function(){return this.width+","+this.height},init:function(t,i){var n=this._={};n.width=t||0,n.height=i||0}});return r.fromString=function(t){var i=t.split(",");return new r(parseFloat(i[0]),parseFloat(i[1]))},r.fromPlain=function(t){return new r(t.w||t.width,t.h||t.height)},r.fromArray=function(t){return new r(t[0],t[1])},r.Zero=new r(0,0),n.Size=r});
//# sourceMappingURL=sourcemaps/Size.js.map

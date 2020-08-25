/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./layout"],function(t,o){var i=t.klass({klassName:"Flow",display:{get:function(){return this._.display}},float:{get:function(){return this._.float}},position:{get:function(){return this._.position}},toCss:function(t){return i.toCss(this,t)},_construct:function(t){this._={display:t.display,float:t.float,position:t.position}}});return i.fromPlain=function(t){return new i({display:t.display,float:t.float,position:t.position})},i.fromCss=i.fromPlain,i.toCss=function(t,o){return o||(o={}),t.display&&(o.display=DisplayMode.toCss(t.display)),t.repeat&&(o.float=t.float.toString()),t.position&&(o.position=t.position.toString()),o},o.Flow=i});
//# sourceMappingURL=sourcemaps/Flow.js.map

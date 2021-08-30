/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./layout","./display-mode","./float-mode","./position-mode"],function(i,o,t,s,n){var a=i.klass({klassName:"Flow",display:{get:function(){return this._.display}},float:{get:function(){return this._.float}},position:{get:function(){return this._.position}},toCss:function(i){return a.toCss(this,i)},_construct:function(o){this._={display:i.isString(o.display)?t[o.display]:o.display,float:i.isString(o.float)?s[o.float]:o.float,position:i.isString(o.position)?n[o.position]:o.position}}});return a.fromPlain=function(i){return new a({display:i.display,float:i.float,position:i.position})},a.fromCss=a.fromPlain,a.toCss=function(i,o){return o||(o={}),i.display&&(o.display=t.toCss(i.display)),i.repeat&&(o.float=s[i.float]),i.position&&(o.position=n[i.position]),o},o.Flow=a});
//# sourceMappingURL=sourcemaps/flow.js.map

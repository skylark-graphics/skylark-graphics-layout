/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(t,n){var i=n.define,require=n.require,r="function"==typeof i&&i.amd,o=!r&&"undefined"!=typeof exports;if(!r&&!i){var e={};i=n.define=function(t,n,i){"function"==typeof i?(e[t]={factory:i,deps:n.map(function(n){return function(t,n){if("."!==t[0])return t;var i=n.split("/"),r=t.split("/");i.pop();for(var o=0;o<r.length;o++)"."!=r[o]&&(".."==r[o]?i.pop():i.push(r[o]));return i.join("/")}(n,t)}),resolved:!1,exports:null},require(t)):e[t]={factory:null,resolved:!0,exports:i}},require=n.require=function(t){if(!e.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=e[t];if(!module.resolved){var i=[];module.deps.forEach(function(t){i.push(require(t))}),module.exports=module.factory.apply(n,i)||null,module.resolved=!0}return module.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-graphics-layout/layout",["skylark-langx/skylark","skylark-langx/langx"],function(t,n){return t.attach("graphics.layout",{log2:function(t){for(var n=1,i=0;t>n;)n<<=1,i++;return i}})}),t("skylark-graphics-layout/AnchorStyle",["skylark-langx/langx","./layout"],function(t,n){var i=["none","left","top","right","bottom"];return t.mixin(i,{none:0,left:1,top:2,right:3,bottom:4}),n.AnchorStyle=i}),t("skylark-graphics-layout/Location",["skylark-langx/langx","skylark-langx-measures/MeasureValue","./layout"],function(t,n,i){var r=t.klass({klassName:"Location",x:{get:function(){return this._.x},set:function(t){this._.x=n.parse(t)}},y:{get:function(){return this._.y},set:function(t){this._.y=n.parse(t)}},clone:function(){return new r(this.x,this.y)},toArray:function(){return[this.x,this.y]},toPlain:function(){return{x:this.x,y:this.y}},toString:function(){return this.x+","+this.y},toCss:function(t){return r.toCss(this,t)},_construct:function(t,i){this._={x:n.parse(t),y:n.parse(i)}}});return r.fromString=function(t){var n=t.split(",");return r.fromArray(n)},r.fromPlain=function(t){var n=t.x||t.l||t.left,i=t.y||t.t||t.top;return new r(n,i)},r.fromArray=function(t){return new r(t[0],t.length>1?t[1]:void 0)},r.fromCss=function(t){return Point.fromPlain({x:t.left,y:t.top})},r.toCss=function(t,n){return n||(n={}),n.left=t.x&&t.x.toString(),n.top=t.y&&t.y.toString(),n},i.Location=r}),t("skylark-graphics-layout/Size",["skylark-langx/langx","skylark-langx-measures/MeasureValue","./layout"],function(t,n,i){var r=t.klass({klassName:"Size",width:{get:function(){return this._.width},set:function(t){this._.width=n.parse(t)}},height:{get:function(){return this._.height},set:function(t){this._.height=n.parse(t)}},clone:function(){return new r(this.width,this.height)},toArray:function(){return[this.width,this.height]},toPlain:function(){return{width:this.width.toStrng(),height:this.height.toString()}},toString:function(){return this.width.toString()+" "+this.height.toString()},_construct:function(t,i){this._={width:n.parse(t),height:n.parse(i)}}});return r.fromString=function(t){for(var n=t.split(" "),i=0;i<n.length;i++)"null"==n[i]?n[i]=null:"undefined"==n[i]&&(n[i]=void 0);return r.fromArray(n)},r.fromPlain=function(t){var n=t.width||t.w,i=t.height||t.h;return new r(n,i)},r.fromArray=function(t){return new r(t[0],t.length>1?t[1]:t[0])},r.fromCss=function(t){return r.fromPlain(t)},r.toCss=function(t,n){if(n||(n={}),t){var i=t.width,r=t.height;i&&(n.width=i.toString()),r&&(n.height=r.toString())}return n},r.auto=new r(n.auto,n.auto),i.Size=r}),t("skylark-graphics-layout/Bounds",["skylark-langx/langx","./layout","./Location","./Size"],function(t,n,i,r){var o=t.klass({klassName:"Bounds",bounds:{get:function(){var t=this._,n={x:t.x,y:this.y,width:t.width,height:t.height};return n}},x:{get:function(){return this._.x}},y:{get:function(){return this._.y}},width:{get:function(){return this._.width}},height:{get:function(){return this._.height}},radius:{get:function(){return this._.radius}},leftTop:{get:function(){var t=this._;return new i(t.x,t.y)}},leftBottom:{get:function(){var t=this._;return new i(t.x,t.y+t.height)}},rightTop:{get:function(){var t=this._;return new i(t.x+t.width,t.y)}},rightBottom:{get:function(){var t=this._;return new i(t.x+t.width,t.y+t.height)}},size:{get:function(){var t=this._;return new r(t.width,t.height)}},move:function(t,n){var i=this._;return new o(i.x+t,i.y+n,i.width,i.height,i.radius)},containPoint:function(t,n){if(void 0===n){var i=t;t=i.x,n=i.y}var r=this._;return t>=r.x&&t<r.x+r.width&&n>=r.y&&n<r.y+r.height},isEmpty:function(){return this.width<=0||this.height<=0},notEqual:function(t){return!t||t.x!=this.x||t.y!=this.y||t.width!=this.width||t.height!=this.height||t.radius!=this.radius},equal:function(t){return!this.notEqual(t)},isIntersect:function(t,n,i,r){var o=this.x1,e=this.y,s=this.width,a=this.height;return Math.min(o+s,t+i)-(o>t?o:t)>0&&Math.min(e+a,n+r)-(e>n?e:n)>0},intersect:function(t,n,i,r){var o=this.x1,e=this.y,s=this.width,a=this.height;return Math.min(o+s,t+i)-(o>t?o:t)>0&&Math.min(e+a,n+r)-(e>n?e:n)>0},unite:function(t,n,i,r){var e=this.x1,s=this.y,a=this.width,u=this.height,h=e<t?e:t,l=s<n?s:n,g=Math.max(e+a,t+i)-h;return height=Math.max(s+u,n+r)-l,new o(h,l,g,height)},clone:function(){var t=this._;return new o(t.x,t.y,t.width,t.height,t.radius)},init:function(t,n,i,r,o){var e=this._={};e.x=t||0,e.y=n||0,e.width=i||0,e.height=r||0,e.radius=o||0}});return o.fromString=function(t){var n=t.split(",");return new o(parseFloat(n[0]),parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3]))},o.fromPlain=function(t){return new o(t.x||t.l,t.y||t.t,t.w||t.width,t.h||t.height)},o.fromArray=function(t){return new o(t[0],t[1],t[2],t[3])},o.Zero=new o(0,0,0,0),n.Bounds=o}),t("skylark-graphics-layout/Direction",["skylark-langx/langx","./layout"],function(t,n){var i=["leftRight","rightLeft","topDown","bottomUp"];return t.mixin(i,{leftRight:0,rightLeft:1,topDown:2,bottomUp:3}),n.Direction=i}),t("skylark-graphics-layout/DisplayMode",["skylark-langx/langx","./layout"],function(t,n){var i=["none","inline","block","listtem","inlineblock","tableRowGroup","tablecell","tablerow"];return t.mixin(i,{none:0,inline:1,block:2,listtem:3,inlineblock:4,tableRowGroup:5,tablecell:6,tablerow:7}),i.fromCss=function(t){switch(t){case"none":return i.none;case"inline":return i.inline;case"block":return i.block;case"list-item":return i.listtem;case"inline-block":return i.inlineblock;case"table-cell":return i.tablecell;case"table-row":return i.tablerow;case"table-row-group":return i.tableRowGroup;default:return}},i.toCss=function(t){switch(t){case i.none:return"none";case i.inline:return"inline";case i.block:return"block";case i.listtem:return"list-item";case i.inlineblock:return"inline-block";case i.tablecell:return"table-cell";case i.tablerow:return"table-row";case i.tableRowGroup:return"table-row-group";default:return}},n.DisplayMode=i}),t("skylark-graphics-layout/FloatMode",["skylark-langx/langx","./layout"],function(t,n){var i=["none","left","right"];return t.mixin(i,{none:0,left:1,right:2}),n.FloatMode=i}),t("skylark-graphics-layout/PositionMode",["skylark-langx/langx","./layout"],function(t,n){var i=["absolute","fixed","relative","static"];return t.mixin(i,{absolute:0,fixed:1,relative:2,static:3}),n.PositionMode=i}),t("skylark-graphics-layout/Flow",["skylark-langx/langx","./layout","./DisplayMode","./FloatMode","./PositionMode"],function(t,n,i,r,o){var e=t.klass({klassName:"Flow",display:{get:function(){return this._.display}},float:{get:function(){return this._.float}},position:{get:function(){return this._.position}},toCss:function(t){return e.toCss(this,t)},_construct:function(n){this._={display:t.isString(n.display)?i[n.display]:n.display,float:t.isString(n.float)?r[n.float]:n.float,position:t.isString(n.position)?o[n.position]:n.position}}});return e.fromPlain=function(t){return new e({display:t.display,float:t.float,position:t.position})},e.fromCss=e.fromPlain,e.toCss=function(t,n){return n||(n={}),t.display&&(n.display=i.toCss(t.display)),t.repeat&&(n.float=r[t.float]),t.position&&(n.position=o[t.position]),n},n.Flow=e}),t("skylark-graphics-layout/HorzAlign",["skylark-langx/langx","./layout"],function(t,n){var i=["left","center","right","stretch"];return t.mixin(i,{left:0,center:1,right:2,stretch:3}),n.HorzAlign=i}),t("skylark-graphics-layout/Margin",["skylark-langx/langx","./layout"],function(t,n){var i=/\d*\D*\s*/g,r=t.klass({klassName:"Margin",left:{get:function(){return this._.left}},top:{get:function(){return this._.top}},right:{get:function(){return this._.right}},bottom:{get:function(){return this._.bottom}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._={left:t,right:t,top:t,bottom:t}},clone:function(){var t=this._;return new Padding(t.top,t.right,t.left,t.bottom)},equale:function(t){return this.left==t.left&&this.top==t.top&&this.right==t.right&&this.bottom==t.bottom},equale:function(t){return this.left==t.left&&this.top==t.top&&this.right==t.right&&this.bottom==t.bottom},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{top:this.top,right:this.right,left:this.left,bottom:this.bottom}},toCss:function(t){return Padding.toCss(this,t)},toString:function(){var t=this.left.toString(),n=this.top.toString(),i=this.right.toString(),r=this.bottom.toString();return i==t?n==r?n==i?n.toString():n+" "+i:n+" "+i+" "+r:n+" "+i+" "+t+" "+r},_construct:function(t,n,i,r){void 0===r&&(void 0===i?void 0===n?r=i=n=void 0===t?t=0:t:(r=t,i=n):(r=i,i=n)),this._={left:i,right:n,top:t,bottom:r}}});return t.mixin(r,{fromArray:function(t){switch(t.length){case 1:return new r(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new r(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new r(t.t,t.r,t.l,t.b)},fromString:function(t){var n,o,e,s,a=t.match(i),u=a.length;switch(u){case 1:n=o=e=s=a[0];break;case 2:n=s=a[0],o=e=a[1];break;case 3:n=a[0],o=e=a[1],s=a[2];break;case 4:n=a[0],o=a[1],e=a[2],s=a[3]}return new r(n,o,e,s)},Zero:new r(0)}),r.fromCss=function(t){return new r(t.marginTop,t.marginRight,t.marginLeft,t.marginBottom)},r.toCss=function(t,n){return n||(n={}),n.marginTop=t.top.toString(),n.marginRight=t.right.toString(),n.marginLeft=t.left.toString(),n.marginBottom=t.bottom.toString(),n},r}),t("skylark-graphics-layout/Padding",["skylark-langx/langx","./layout"],function(t,n){var i=/\d*\D*\s*/g,r=t.klass({klassName:"Padding",left:{get:function(){return this._.left}},top:{get:function(){return this._.top}},right:{get:function(){return this._.right}},bottom:{get:function(){return this._.bottom}},getAll:function(){return this.left==this.bottom&&this.top==this.right&&this.right==this.left?this.left:null},setAll:function(t){this._={left:t,right:t,top:t,bottom:t}},clone:function(){var t=this._;return new r(t.top,t.right,t.left,t.bottom)},equale:function(t){return this.left==t.left&&this.top==t.top&&this.right==t.right&&this.bottom==t.bottom},equale:function(t){return this.left==t.left&&this.top==t.top&&this.right==t.right&&this.bottom==t.bottom},toArray:function(){return[this.top,this.right,this.left,this.bottom]},toPlain:function(){return{top:this.top,right:this.right,left:this.left,bottom:this.bottom}},toCss:function(t){return r.toCss(this,t)},toString:function(){var t=this.left.toString(),n=this.top.toString(),i=this.right.toString(),r=this.bottom.toString();return i==t?n==r?n==i?n.toString():n+" "+i:n+" "+i+" "+r:n+" "+i+" "+t+" "+r},_construct:function(t,n,i,r){void 0===r&&(void 0===i?void 0===n?r=i=n=void 0===t?t=0:t:(r=t,i=n):(r=i,i=n)),this._={left:i,right:n,top:t,bottom:r}}});return t.mixin(r,{fromArray:function(t){switch(t.length){case 1:return new r(t[0],t[0],t[0],t[0]);case 2:case 3:case 4:return new r(t[0],t[1],t[1],t[0]);default:return}},fromPlain:function(t){return new r(t.t,t.r,t.l,t.b)},fromString:function(t){var n,o,e,s,a=t.match(i),u=a.length;switch(u){case 1:n=o=e=s=a[0];break;case 2:n=s=a[0],o=e=a[1];break;case 3:n=a[0],o=e=a[1],s=a[2];break;case 4:n=a[0],o=a[1],e=a[2],s=a[3]}return new r(n,o,e,s)},Zero:new r(0)}),r.fromCss=function(t){return new r(t.paddingTop,t.paddingRight,t.paddingLeft,t.paddingBottom)},r.toCss=function(t,n){return n||(n={}),t&&(n.paddingTop=t.top.toString(),n.paddingRight=t.right.toString(),n.paddingLeft=t.left.toString(),n.paddingBottom=t.bottom.toString()),n},r}),t("skylark-graphics-layout/Restriction",["skylark-langx/langx","skylark-langx-measures/MeasureValue","./layout"],function(t,n,i){var r=t.klass({klassName:"Restriction",maxHeight:{get:function(){return this._.maxHeight}},maxWidth:{get:function(){return this._.maxWidth}},minHeight:{get:function(){return this._.minHeight}},minWidth:{get:function(){return this._.minWidth}},toCss:function(t){return r.toCss(this,t)},toString:function(){var t=this.minWidth,n=this.minHeight,i=this.maxWidth,r=this.maxHeight;return t.toString()+" "+n.toString()+" "+i.toString()+" "+r.toString()},_consturct:function(t,n,i,r){this._={minWidth:t,minHeight:n,maxWidth:i,maxHeight:r}}});return r.fromString=function(t){var n=t.split(" ");return r.fromArray(n)},r.fromPlain=function(t){var i=t.minWidth,o=t.minHeight,e=t.maxWidth,s=t.maxHeight;return i=i||n.none,o=o||n.none,e=e||n.none,s=s||n.none,new r(i,o,e,s)},r.fromArray=function(t){return new r(t.length>0?t[0]:n.none,t.length>1?t[1]:n.none,t.length>2?t[2]:n.none,t.length>3?t[3]:n.none)},r.fromCss=function(t){return r.fromPlain(t)},r.toCss=function(t,n){if(n||(n={}),t){var i=t.maxWidth,r=t.maxHeight,o=t.minWidth,e=t.minHeight;i&&(n.maxWidth=i.type===MeasureType.none?"":i.toString()),r&&(n.maxHeight=r.type===MeasureType.none?"":r.toString()),o&&(n.minWidth=o.type===MeasureType.none?"":o.toString()),e&&(n.minHeight=e.type===MeasureType.none?"":e.toString())}return n},r.none=new r(n.none,n.none,n.none,n.none),r}),t("skylark-graphics-layout/VertAlign",["skylark-langx/langx","./layout"],function(t,n){return t.mixin(["top","center","bottom","stretch"],{top:0,center:1,bottom:2,stretch:3}),Alignment}),t("skylark-graphics-layout/main",["./layout","./AnchorStyle","./Bounds","./Direction","./DisplayMode","./FloatMode","./Flow","./HorzAlign","./Location","./Margin","./Padding","./PositionMode","./Restriction","./Size","./VertAlign"],function(t){return t}),t("skylark-graphics-layout",["skylark-graphics-layout/main"],function(t){return t})}(i),!r){var s=require("skylark-langx-ns");o?module.exports=s:n.skylarkjs=s}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-graphics-layout.js.map

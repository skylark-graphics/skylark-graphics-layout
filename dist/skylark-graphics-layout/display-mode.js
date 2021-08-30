/**
 * skylark-graphics-layout - The skylark measure class library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./layout"],function(e,l){var n=["none","inline","block","listtem","inlineblock","tableRowGroup","tablecell","tablerow"];return e.mixin(n,{none:0,inline:1,block:2,listtem:3,inlineblock:4,tableRowGroup:5,tablecell:6,tablerow:7}),n.fromCss=function(e){switch(e){case"none":return n.none;case"inline":return n.inline;case"block":return n.block;case"list-item":return n.listtem;case"inline-block":return n.inlineblock;case"table-cell":return n.tablecell;case"table-row":return n.tablerow;case"table-row-group":return n.tableRowGroup;default:return}},n.toCss=function(e){switch(e){case n.none:return"none";case n.inline:return"inline";case n.block:return"block";case n.listtem:return"list-item";case n.inlineblock:return"inline-block";case n.tablecell:return"table-cell";case n.tablerow:return"table-row";case n.tableRowGroup:return"table-row-group";default:return}},l.DisplayMode=n});
//# sourceMappingURL=sourcemaps/display-mode.js.map

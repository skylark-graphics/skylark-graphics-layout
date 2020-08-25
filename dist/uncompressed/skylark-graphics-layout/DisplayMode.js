define([
    "skylark-langx/langx",
    "./layout"
],function(langx,layout) {

    var DisplayMode = ["none", "inline", "block", "listtem", "inlineblock", "tableRowGroup", "tablecell", "tablerow"];

    langx.mixin(DisplayMode,{
        "none" : 0, 
        "inline" : 1, 
        "block" : 2, 
        "listtem" : 3, 
        "inlineblock" :4, 
        "tableRowGroup" : 5, 
        "tablecell" : 6, 
        "tablerow" : 7
    });

    DisplayMode.fromCss = function(s) {
        switch (s) {
            case "none":
                return DisplayMode.none;
            case "inline":
                return DisplayMode.inline;
            case "block":
                return DisplayMode.block;
            case "list-item":
                return DisplayMode.listtem;
            case "inline-block":
                return DisplayMode.inlineblock;
            case "table-cell":
                return DisplayMode.tablecell;
            case "table-row":
                return DisplayMode.tablerow;
            case "table-row-group":
                return DisplayMode.tableRowGroup
            default:
                return undefined;
        }
    };
    
    DisplayMode.toCss = function(mode) {
        switch (mode) {
            case DisplayMode.none:
                return "none";
            case DisplayMode.inline:
                return "inline";
            case DisplayMode.block:
                return "block";
            case DisplayMode.listtem:
                return "list-item";
            case DisplayMode.inlineblock:
                return "inline-block";
            case DisplayMode.tablecell:
                return "table-cell";
            case DisplayMode.tablerow:
                return "table-row";
            case DisplayMode.tableRowGroup:
                return "table-row-group";
            default:
                return undefined;
        }
    };

    return layout.DisplayMode = DisplayMode;

});

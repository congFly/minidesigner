require('../../css/index.css')
var $ = require('jquery');
var _ = require('lodash');
var jstree = require('jstree');
require('jquery-ui');
require("../lib/jquery.layout-latest");

var dataExchange = require('../util/dataExchange');
var designer = require('../cmd/designer')

var northPanel = require('./panels/north/northPanel')
var westPanel = require('./panels/west/westPanel')//tree
var eastPanel = require('./panels/east/eastPanel')
var centerPanel = require('./panels/center/centerPanel')

console.log('初始化总体布局: ');
$(function () {
    var myLayout = $('body').layout({
        applyDefaultStyles: true,
        scrollToBookmarkOnLoad: false,
        showOverflowOnHover: false,
        north__closable: true,
        north__resizable: false,
        north__size: 50,
        east__size:600
    });
    //myLayout.toggle("north");
    myLayout.sizePane("west", 500);
    myLayout.allowOverflow("north");

    // designer.load('1', function (json) {
    //     westPanel.setRkJson(json);
    //     eastPanel.setWidgetInfo(dataExchange.getWidgetsInfo());
    // });
    
    eastPanel.init();
    northPanel.init();
    centerPanel.init();
});
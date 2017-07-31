var $ = require('jquery');
var jstree = require('jstree');
module.exports = {
    addWidget: function (widgetType) {
        var treeNode = $.jstree.reference('#tree');
        var select = treeNode.get_selected();
        if (!select.length) {
            return false;
        }
        var parentNode = select[0];
        var newNode = {
            text: widgetType,
            li_attr: {
                "wtype": widgetType,
                "wid": Math.floor(Math.random() * 10),
                "class": "widget"
            }
        }
        return treeNode.create_node(parentNode, newNode);
    }
}
 
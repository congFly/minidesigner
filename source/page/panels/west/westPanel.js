var eastPanel = require('../east/eastPanel')
var dataExchange = require('../../../util/dataExchange');
// var changeNode = require('../../../util/changeNode');
var $ = require('jquery');
require('jquery-ui');
require('../../../../css/themes/minidesigner/style.css');//jstree css
require('../../../lib/jquery-ui-1.12.1.custom/jquery-ui.min');
require('../../../lib/jquery-ui-1.12.1.custom/jquery-ui.min.css');
var jstree = require('jstree');

require('../../../../../../node_modules/hotkeys-js/dist/hotkeys.min');
var create = require('../../popups/create');
var eastPanel = require('../../panels/east/eastPanel');


module.exports = {
    setRkJson: function (rkJson) {
        //获得
        window.west = this;
        window.location.reload(false);
        var treeJson = dataExchange.rk2tree(rkJson, true);

        //显示成tree的样子
        // $.jstree.destroy("#tree");//销毁
        $('#tree').jstree({
                "plugins": [
                    "contextmenu", "dnd", "state", "types", "json_data", "hotkeys"
                ], "search": {
                    "case_insensitive": true
                }, "contextmenu": {
                    "items": function () {
                        var temp = $.jstree.defaults.contextmenu.items();
                        delete temp.create.action;
                        delete temp.remove.action;
                        temp.create.label = "create";
                        temp.create.submenu = {
                            "create_layout": {
                                "separator_after": true,
                                "label": "layout",
                                "action": function () {
                                    create.popupCreateDialog((temp.create.submenu).create_layout.label);
                                }
                            },
                            "create_container": {
                                "separator_after": true,
                                "label": "container",
                                "action": function () {
                                    create.popupCreateDialog((temp.create.submenu).create_container.label);
                                }
                            },
                            "create_widget": {
                                "separator_after": true,
                                "label": "widgets",
                                "action": function () {
                                    create.popupCreateDialog((temp.create.submenu).create_widget.label);
                                }
                            }
                        };
                        temp.remove = {
                            "label": "delete",
                            'action': function () {
                                module.exports.deleteTreeNode();
                            }
                        }
                        return temp;
                    }
                },
                'core': {
                    'initially_open': ["root"],
                    "animation": 0,
                    "check_callback": true,
                    "multiple": true,
                    'data': treeJson
                }
            }
        );


        $('#tree').jstree("enable_hotkeys");
        var state = [];

        function saveState(nowState) {
            state.push(nowState);
            if (state.length > 20) {
                return state.shift();
            }
        }

        $('#tree').bind('loaded.jstree', function (e, data) {
            data.instance.open_all();
            var nowState = $('#tree').jstree(true).get_json('#', {flat: false});
            saveState(nowState);
        });
        $('#tree').jstree("enable_hotkeys");
        function processChange(event, obj) {
            var nowState = $('#tree').jstree(true).get_json('#', {flat: false});
            saveState(nowState);
        }

        $('#tree').bind('delete_node.jstree', processChange);
        hotkeys('ctrl+z', function () {
            if (state.length <= 1) {
                return;
            }
            var tree = $.jstree.reference('#tree');
            var lastState = state.pop();
            var currentState = state.pop();
            tree.settings.core.data = currentState;
            tree.refresh();
            saveState(currentState)
        });
        $('#tree').bind('click.jstree', function () {
            var tree = $.jstree.reference('#tree');
            var select = tree.get_selected();
            var wid = $('#' + select).attr('wid');
            eastPanel.jumpToWidget(wid);
        });

    },
    getRkJson: function () {
        //返回json       tree to rk
        // var treeJson = {};
        var treeJson = $('#tree').jstree(true).get_json('#', {flat: false});
        var rkJson = dataExchange.tree2rk(treeJson[0]);
        return rkJson;
    },
    //增加一个节点
    appendTreeNode: function (pid, node) {
        var tree = $.jstree.reference('#tree');
        var select = tree.get_selected();
        if (!select.length) {
            return false;
        }
        var pid = select[0];
        tree.create_node(pid, node);
    },
    deleteTreeNode: function () {
        {
            var tree = $.jstree.reference('#tree');
            var select = tree.get_selected();
            var wid = $('#' + select).attr('wid');
            if (!select.length) {
                return false;
            }
            var nodeid = select[0];
            var node = tree.get_json(nodeid, {flat: true})

            var deletewidgets = [];
            node.forEach(function(n, i){
                deletewidgets.push(n.li_attr.wid)
            })
            eastPanel.deleteWidget(deletewidgets);
            tree.delete_node(select);
        }
    },
    jumpToNode: function (uuid) {
        var tree = $.jstree.reference('#tree');
        var nodeid = $('#tree').find('[wid="'+uuid+'"]').attr('id')
        tree.deselect_all();
        tree.select_node(nodeid)
        // $('.selectNode').removeClass('selectNode');
        // $("[wid=" + uuid + "]").addClass('selectNode').siblings().removeClass('selectNode');
    },
    changeTreeNode: function () {

    },
    /***** UI ******/
}

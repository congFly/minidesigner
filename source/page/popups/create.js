var westPanel = require('../panels/west/westPanel')
var createdialog = require('../panels/west/createDialog/createdialog')

module.exports = {
    popupCreateDialog: function (type) {
        $('body').append('<div id="create_dialog"></div>');
        var $dialog = $('#create_dialog');
        $dialog.css('overflow','visible')
        $dialog.empty();
        $dialog.append('<input type="text" id="in"/><ul id="search"></ul>');
        $dialog.dialog(
            {
                title: type,
                height: "300",
                width: "650",
                buttons: {
                    "add": function () {
                        var dialog = $(this);
                        var nodeName = dialog.find('input').val();
                        var tree = $.jstree.reference('#tree');
                        var select = tree.get_selected();
                        var pid = select[0];
                        westPanel.appendTreeNode(pid,nodeName)
                        dialog.dialog("close");

                        // dialog.find('input').val('');

                        // var json = {
                        //     text: 'xsyAccountInfo(#1122334455)',
                        //     children: [],
                        //     li_attr: {
                        //         "wtype": "xsyAccountInfo",
                        //         "wid": 1122334455,
                        //         "class": "layout"
                        //     }
                        // };
                    },
                    "cancel": function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    $(this).dialog("destroy")
                    $("#in").hide();
                },
            }
        );
        $("#in").show();
        createdialog.createdialog(type)

    }
}
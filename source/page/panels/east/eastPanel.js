var dataExchange = require('../../../util/dataExchange');
var $ = require('jquery');
var JSONEditor = require('../../../../../../node_modules/jsoneditor/dist/jsoneditor.min');
require('../../../../../../node_modules/jsoneditor/dist/jsoneditor.min.css');

module.exports = {
    editors: {},
    init: function (rkJson) {
        var me = this;

        $('#eastPanel').on('click', '.help', function () {
            var btn = $(this)
            var container = btn.closest('.json_editor');
            var wid = container.attr('refid');
            var wtype = container.attr('reftype');
            var info = btn.next('.info');

            var editor = me.editors[wid];
            var aceEditor = editor.aceEditor;
            var selection = aceEditor.getSelection();
            var selectionRange = aceEditor.getSelectionRange();

            if (selectionRange.start.row === selectionRange.end.row) {
                var line = selection.doc.$lines[selectionRange.start.row];
                var text = line.substring(selectionRange.start.column, selectionRange.end.column)
                $('#northPanel').html('选择关键字：' + text)

                if (text == 'showMode' && /Refer$/.test(wtype)) {
                    $('#northPanel').html('选择关键字：' + text + ', 可选项为：card, grid')
                }
            }
        })
    },
    _handleEditorFocus: function(e,o){
        var me = this;
        var container = $(o.container).closest('.json_editor');
        var wid = container.attr('refid');
        var wtype = container.attr('reftype');
        me.highlightEditor(wid)
        require('../west/westPanel').jumpToNode(wid);
    },
    setWidgetInfo: function (json) {
        var me = this;
        // create the editor 
        for (var uuid in json) {
            var editorid = 'editor_' + uuid;
            var winfo = json[uuid];
            var winfo_txt = JSON.stringify(winfo);
            //console.log(winfo_txt, winfo_txt.match(/}/ig))
            $('#eastPanel').append('<div class="json_editor" refid="' + uuid + '" reftype="' + winfo.widgetType + '" id="' + editorid + '" style="height:' + (10 * 20) + 'px"></div>');
            var container = document.getElementById(editorid);
            var options = {
                mode: 'code',
                //"indentation": 21
                //input_height : 888
            };
            var editor = new JSONEditor(container, options);
            var aceEditor = editor.aceEditor; //https://ace.c9.io/#nav=api&api=editor
            $(editor.menu).find('.jsoneditor-poweredBy, button').remove();
            $(editor.menu).append('<div class="uuid" style="font-size:22px;">#' + uuid + ' ' + winfo.widgetType + ' <a class="help" href="javascript:void(0)">?</a>&nbsp;<span class="info"></span></div>')
            var frame = $(editor.frame);
            var box = frame.parent();

            $(container).on('keyup', function () {
                console.log('keyup')
            })
            aceEditor.on("change", function () {
                console.log('change')
            })
            aceEditor.on("focus", function (e, o) {
                me._handleEditorFocus(e, o);
            })
            aceEditor.on('copy', function (txt) {
                console.log('copy', txt)
            })

            me.editors[uuid] = editor;
            me.editors[uuid].set(winfo);
        }
    },
    getWidgetInfo: function (uuid) {
        var me = this;

        var txt = me.editors[uuid].getText();
        return txt;
    },
    getWidgetsInfo: function () {
        var me = this;
        var widgets = {}
        $('#eastPanel').find('.json_editor').each(function () {
            var el = $(this);
            var refid = el.attr('refid')
            var txt = me.editors[refid].getText();
            widgets[refid] = JSON.parse(txt)
        })
        return widgets;
    },
    appendWidget: function (uuid) {
        var me = this;
        me.jumpToWidget(uuid);
    },
    deleteWidget: function (idlist) {
        if(!$.isArray(idlist)) idlist = [idlist];
        idlist.forEach(function(wid, i){
            var editorid = 'editor_' + wid;
            $('#eastPanel').find('#' + editorid).remove();            
        })
    },
    jumpToWidget: function (uuid) {
        var me = this;
        var editorid = 'editor_' + uuid;
        var top = 0;
        $('#' + editorid).prevAll().each(function () {
            top += $(this).outerHeight();
        });
        $('#eastPanel').scrollTop(top);
        me.highlightEditor(uuid)
    },
    highlightEditor: function(uuid){
        var editorid = 'editor_' + uuid;
        var editorbox = $('#eastPanel').find('#' + editorid);
        $('#eastPanel').find('.selectedEditorTitle').removeClass('selectedEditorTitle');
        editorbox.find('.jsoneditor-menu').addClass('selectedEditorTitle');        
    }
}
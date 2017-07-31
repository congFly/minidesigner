var dataExchange = require('../../../util/dataExchange');
var designer = require('../../../cmd/designer')
var westPanel = require('../west/westPanel')
var eastPanel = require('../east/eastPanel')

var JSONEditor = require('../../../../../../node_modules/jsoneditor/dist/jsoneditor.min');
require('../../../../../../node_modules/jsoneditor/dist/jsoneditor.min.css');

module.exports = {
    editor: null,
    init: function () {
        var me = this;

        $('#open_btn').click(function(){
            var panelid = 'centerPanel'
            $('#'+panelid).find('img').remove()
            var container = document.getElementById(panelid);
            var options ={
                mode: 'code'
              };
            var editor = new JSONEditor(container, options);
            me.editor = editor;

            $('#import_btn').show();
            $('#export_btn').show();
            $('#open_btn').hide();

            $(editor.menu).find('.jsoneditor-poweredBy').remove();

            editor.set(require('../../../../test/mock/layouts/layout1.json'));
        })
        $('#import_btn').one('click',function(){
            me.setJson();
        })
        $('#export_btn').click(function(){
            var json = westPanel.getRkJson();
            var widgets = eastPanel.getWidgetsInfo();
            //$.extend(json.config.widgets, widgets);
            json.config.widgets = widgets;
            me.showResult(json);    
            alert('导出成功！')        
        })
    },
    setJson: function(){
        var me = this;

        var json = me.editor.getText();
        json = JSON.parse(json);
        designer.load(json, function (json) {
            westPanel.setRkJson(json);
            eastPanel.setWidgetInfo(dataExchange.getWidgetsInfo());
        });
    },
    showResult: function (rkJson) {
        var me = this;
        
        me.editor.set(rkJson);
    }
}
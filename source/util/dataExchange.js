var $ = require('jquery');
var _ = require('lodash');
//var fs = require('fs')
var isNumeric = function (val) {
    return /^[0-9]+$/i.test(val + '')
};
var rkToMid = function (layoutJson, treeJson) {
    var widgets = currentAllJson.config.widgets;
    var wtype = (widgets[layoutJson.uuid] ? widgets[layoutJson.uuid].widgetType : 'unknown');

    layoutJson = _.clone(layoutJson, true)
    treeJson = treeJson
    treeJson.text = wtype;

    //jstree特有属性
    treeJson.li_attr = {
        "wtype": wtype,
        "wid": layoutJson.uuid
    }

    if (_.isArray(layoutJson.children)) {
        //treeJson.icon = "widget";//jstree特有属性
        treeJson.children = _.clone(layoutJson.children, true);
        for (var i = 0; i < layoutJson.children.length; i++) {
            rkToMid(treeJson.children[i], layoutJson.children[i]);
        }
    } else if (layoutJson.children) {
        //treeJson.icon = "layout2";//jstree特有属性
        treeJson.children = [];
        var children = layoutJson.children;
        for (var layoutname in layoutJson.children) {
            var nextchildren = children[layoutname];//含有下一级孩子的数组
            var obj = {
                text: layoutname,
                children: _.clone(nextchildren, true),
                li_attr: {
                    "wtype": "layout",
                    "wid": layoutname,
                    "class": "layout"
                },
                icon: 'layout'
            };
            treeJson.children.push(obj);
            for (var i = 0, len = obj.children.length; i < len; i++) {
                var o = obj.children[i];
                rkToMid(children[layoutname][i], o);
            }
        }
    }

    return treeJson;
}

function midToTree(treeJson) {
    var str = JSON.stringify(treeJson);
    return JSON.parse(str.replace(/\"uuid\"\s?:\s?\"/g, '\"text\":\"'));
}
var decorateTree = function (layoutJson){
    layoutJson.text = '<b style="font-size:20px;">' + layoutJson.text + '</b>' + '&nbsp;<span style="color:blue">#'+layoutJson.li_attr.wid+'</span>&nbsp;'
    for (var i = 0; i < layoutJson.children.length; i++) {
        _decorateTree(layoutJson.children[i]);
    }
}
var _decorateTree = function (layoutJson){
    var wtype = layoutJson.li_attr.wtype;
    var containers = ['xsyDiv','xsyGridLayout','xsyHorizontalLayout','xsyReferContainer','xsyTab','xsyVerticalLayout']
    
    if(wtype === 'layout'){
        layoutJson.text = '<b style="background-color:yellow;color:red;">' + layoutJson.text + '</b>'
        layoutJson.icon = '/doc/study/minidesigner/css/icons/layout.png'
    }else if(_.includes(containers, wtype)){
        layoutJson.text = '<b style="color:#a00">' + layoutJson.text + '</b>'
        layoutJson.icon = '/doc/study/minidesigner/css/icons/container.png'
    }else{
        layoutJson.icon = '/doc/study/minidesigner/css/icons/widget.png'
    }
    if(wtype !== 'layout')layoutJson.text = layoutJson.text + '&nbsp;<span style="color:blue">#'+layoutJson.li_attr.wid+'</span>&nbsp;'

    var widgets = currentAllJson.config.widgets;
    if (_.isArray(layoutJson.children)) {
        for (var i = 0; i < layoutJson.children.length; i++) {
            _decorateTree(layoutJson.children[i]);
        }
    }
}

function treeToMid(node, parentNode, targetNode, targetParent) {
    var wid = node.li_attr.wid;
    targetNode.text = wid;
    if (!isNumeric(wid)) {
        targetNode.text = wid;
        if (!targetParent.children2) targetParent.children2 = {};
        targetParent.children2[wid] = _.cloneDeep(node.children);
        for (var i = 0; i < node.children.length; i++) {
            var n = node.children[i];
            treeToMid(n, node, targetParent.children2[wid][i], targetParent.children2[wid])
        }
    } else {
        if (node.children && node.children.length) {
            targetNode.children = [];
            for (var i = 0; i < node.children.length; i++) {
                var n = node.children[i];
                targetNode.children.push(_.cloneDeep(n));
            }
            for (var i = 0; i < node.children.length; i++) {
                var n = node.children[i];
                treeToMid(n, node, targetNode.children[i], targetNode);
            }
        }
    }
}

function midToRk(treeJson) {
    var str = JSON.stringify(treeJson);
    return JSON.parse(str.replace(/\"text\"\s?:\s?\"/g, '\"uuid\":\"'));
}
var foreachChildren = function (layoutInfo, callback) {
    (callback)(layoutInfo);
    var children = layoutInfo.children;
    if (children) {
        if (_.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                foreachChildren(children[i], callback)
            }
        } else {
            for (var key in children) {
                var arr = children[key];
                for (var i = 0, len = arr.length; i < len; i++) {
                    foreachChildren(arr[i], callback)
                }
            }
        }
    }
};
var getNewUuid = function(){
    return '7'+Math.floor(Math.random() *  Math.pow(10,10))
}
var currentAllJson;
module.exports = {
    rk2tree: function (allJson, decorate) {
        if(typeof decorate === 'undefined') decorate = false;
        currentAllJson = allJson;
        var widgets = allJson.config.widgets;
        var rkJson = allJson.config.layout;
        for(var uuid in widgets){
            allJson.config.widgets[uuid].userPermission = undefined;
        }
        rkJson = _.clone(rkJson, true);//切断引用
        var treeJson = {};
        rkToMid(rkJson, treeJson)
        treeJson = midToTree(treeJson);
        if(decorate)decorateTree(treeJson);
        //fs.writeFileSync('./output.json', JSON.stringify(treeJson))
        return treeJson;
    },
    tree2rk: function (treeJson) {
        treeJson = _.clone(treeJson, true);//切断引用
        var rkJson = {};
        treeToMid(treeJson, null, rkJson, null);
        foreachChildren(rkJson, function (node) {
            if (node.children2) node.children = node.children2;
            node.children2 = undefined;
            node.li_attr = undefined;
            node.icon = undefined;
            for(var s in node){
                if(s !== 'children' && s!== 'text') node[s] = undefined;
                if(s === 'children' && node[s].length === 0)  node[s] = undefined;
            }
        });
        rkJson = midToRk(rkJson);
        //去除无用控件
        var existUuid = {};
        foreachChildren(rkJson, function (node) {
            existUuid[node.uuid] = true;
        });
        for(var uuid in currentAllJson.config.widgets){
            if(uuid && !existUuid[uuid]) {
                console.log('Not Exist: ', uuid)
                currentAllJson.config.widgets[uuid] = undefined;
            }
        }
        //fs.writeFileSync('./output3.json', JSON.stringify(rkJson))
        currentAllJson.config.layout = rkJson;
        return currentAllJson;
    },
    foreachChildren: foreachChildren,
    getNewUuid: getNewUuid,
    /************************/
    getWidgetsInfo: function(){
        return currentAllJson.config.widgets;
    }
};
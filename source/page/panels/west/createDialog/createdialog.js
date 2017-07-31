var $ = require('jquery');
var reg = /\s/g;
var showDiv = $('#create_dialog')
var showArr, thirdFilter, itemArr, thirdArr
var dataArr = []
var firstFilter = 'xsyBase.js'
var secondFilter = '.js'
//ajax获取给定json数据
$.ajax({
    url: 'test/mock/dependency/dependencyMap_full.json',
    type: 'get',
    success: function (data) {
        for (var key in data) {
            $.each(data[key], function (index, item) {
                if (item.lastIndexOf(firstFilter) != -1) {
                    dataArr.push(key)
                }
            })
        }
    }
})
//筛选出符合需求的路径
function getShowUrl(data) {
    showArr = []
    var flag = 0
    var input = $('#in')
    thirdFilter = input.val()
    $.each(data, function (index, item) {
        if (item.lastIndexOf(secondFilter) != -1) {
            if (reg.test(thirdFilter)) {
                console.log('模糊搜')
               thirdFilter = thirdFilter.replace(reg, "/")
                thirdArr = thirdFilter.split('/')
                //搜索框输入内容数组
                console.log(thirdArr);
                itemArr = item.split('/')
                //url路径切割数组
                $.each(thirdArr, function (index, itemInput) {
                    if (itemInput!=''){
                        $.each(itemArr, function (index, itArr) {
                            //bug 此时 满足一次就添加了
                            if (itArr.indexOf(itemInput)!= -1) {
                              flag++
                                //路径每一次有a都会加加,所以flag++不准确
                                console.log(flag);
                                console.log(itArr);
                                console.log(itemInput);
                            }
                            if (flag == thirdArr.length){
                                item = itemArr.join('/')
                                if (showArr.indexOf(item) == -1) {
                                    showArr.push(item)
                                    console.log('模糊添加')
                                }
                            }

                        })
                    }

                })
            } else {
                if (item.indexOf(thirdFilter) != -1) {
                    if (showArr.indexOf(item) == -1) {
                        console.log('精确')
                        showArr.push(item)
                        console.log(showArr.length);
                    }
                }
            }
        }
    })
    return showArr
}
//将筛选出来的路径展示到页面上
function showIndex(arr) {
    var jqUl = $('#search')
    var input = $('#in')
    if (arr.length > 0) {
        showDiv.show()
        var urls,urlsLength
        for (var i = 0; i < arr.length; i++) {
            var li = document.createElement('li')
            jqUl.append(li)
            urls = arr[i].split('/')
            urlsLength=urls.length
            for (var j = 0; j < urls.length; j++){
                var span = document.createElement('span')
                $(li).append(span)
                $(span).text(urls[j]+'/')
                span.ondblclick=function () {
                    input.val($(this).text().replace('/',''))
                }
            }
            $(li).children().last().text(urls[urlsLength-1])
        }
        var lis = jqUl.children('li')
        lis.eq(0).addClass('active').children().last().prev().addClass('selected')
        lis.on('mouseover', function () {
            $(this).addClass('active').siblings().removeAttr('class')
            $(this).children().last().prev().addClass('selected')
            $(this).siblings().children().removeAttr('class')
        })
    }
}
//键盘上下enter控制滚动
$(document).on('keyup', function (event) {
    var jqUl = $('#search')
    var input = $('#in')
    var currentSpanCtr = $('.selected')
    var currentLi = $('.active')
    var code = event.keyCode
    var liHeight = currentLi.height()
    if (code === 40) {
        var nextIndex = currentLi.index() + 1
        commonKcEvent(jqUl, currentLi, currentSpanCtr, liHeight, nextIndex)
    } else if (code === 38) {
        var prevIndex = currentLi.index() - 1
        commonKcEvent(jqUl, currentLi, currentSpanCtr, liHeight, prevIndex)
    } else if (code === 13) {
        content = currentLi.children().text()
        input.val(content)
    }
})
//键盘滚动事件封装公用方法
function commonKcEvent(parent, currentLi, currentSpanCtr, liHeight, index) {
    var input = $('#in')
    var lis = parent.children('li')
    var instace = liHeight * ( currentLi.index() - 2)
    input.blur()
    currentSpanCtr.removeAttr('class')
    currentLi.removeAttr('class')
    currentLi = lis.eq(index).addClass('active')
    currentSpanCtr = currentLi.children().last().prev()
    currentSpanCtr.addClass('selected')
    parent.scrollTop(instace)
}
//汇总调用函数
function draw(type) {
    if (type === 'widgets') {
        var arr = getShowUrl(dataArr)
        showIndex(arr)
    }
}
//暴露接口函数
module.exports = {
    createdialog: function (type) {
        var jqUl = $('#search')
        $('#in').on('keyup', function () {
            jqUl.empty('li')
            if ($('#in').val() == '') {
            } else {
                draw(type)
            }
        })
    }
}

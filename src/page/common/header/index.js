/*
* @Author: Administrator
* @Date:   2018-03-06 15:09:16
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 15:58:18
*/
'use strict';
require('./index.css');

var _mm = require('util/mm.js');

//通用页面头部
var header={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        var keyword = _mm.getUrlParam('keyword');
        //如果keyword在url中，进行回填
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent:function(){

        var _this = this;
        //搜索按钮点击
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后进行提交
        $('#search-input').keyup(function(e){
            //13为回车键的keycode
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit:function(){
        var keyword = $.trim($('#search-input').val());
        //如果有keyword 跳转list页
        if (keyword) {
            window.location.href='./list.html?keyword='+keyword;
        }
        //为空跳转首页
        else{
            _mm.goHome();
        }
    }
}
header.init();
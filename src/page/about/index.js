/*
* @Author: Administrator
* @Date:   2018-03-07 15:37:22
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 15:19:43
*/
'use strict';
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide=require('page/common/nav-side/index.js');

var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'order-list'
        });
    },
}
$(function(){
    page.init();
});
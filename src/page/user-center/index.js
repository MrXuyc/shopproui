/*
* @Author: Administrator
* @Date:   2018-03-07 15:37:22
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-07 18:04:11
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide=require('page/common/nav-side/index.js');
var templaterIndex=require('./index.string');
var _user=require('service/user-service.js');
var _mm=require('util/mm.js');

var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息 
    loadUserInfo:function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templaterIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorsTips(errMsg);
        });
    }
}
$(function(){
    page.init();
});
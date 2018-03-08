/*
* @Author: Administrator
* @Date:   2018-03-06 14:17:18
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-07 13:51:03
*/
'use strict'
require('./index.css');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var nav={
    init:function(){
        this.bindEvent();
        this.loadUserInfo();
        return this;
    },
    bindEvent:function(){
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href='./user-register.html';
        });
    },
    loadUserInfo:function(){

    }
}
$(function(){
    nav.init();
})
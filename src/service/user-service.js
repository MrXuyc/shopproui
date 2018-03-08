/*
* @Author: Administrator
* @Date:   2018-03-07 10:40:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 10:46:00
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
    //用户登录
    login:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    checkUsername:function(username,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            data : {
                type :'username',
                str : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    register:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    getQuestion:function(username,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/user/forget_get_question.do'),
            data : {
                username:username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //检查密码提示问题答案
    checkAnswer:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/forget_check_answer.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    resetPassword:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/foeget_reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //登出
    logout:function(resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //获取用户信息
    getUserInfo:function(resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/get_information.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //更改用户信息
    updateUserInfo:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/update_information.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    updatePassword:function(userInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/user/reset_password.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _user;
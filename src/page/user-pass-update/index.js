/*
* @Author: Administrator
* @Date:   2018-03-07 16:36:34
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 10:44:42
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide=require('page/common/nav-side/index.js');
var _user=require('service/user-service.js');
var _mm=require('util/mm.js');

var page={
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'user-pass-update'
        });
        this.loadUserInfo();
    },
    //加载用户信息 
    loadUserInfo:function(){
        
    },
    bindEvent:function(){
        var _this=this;
        $(document).on('click','.btn-submit',function(){
            var userInfo={
                password : $.trim($('#password').val()),
                passwordNew :$.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updatePassword({
                    password : userInfo.password,
                    passwordNew :userInfo.passwordNew,
                },function(res,msg){
                    _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorsTips(errMsg);
                });
            }else{
                _mm.errorsTips(validateResult.msg);
            }
        });
    },
    validateForm:function(formData){
        var result={
            status:false,
            msg:''
        }
        if (!_mm.validate(formData.password,'require')) {
            result.msg='密码不能为空';
            return result;
        }
        if (!formData.passwordNew||formData.passwordNew.length < 6) {
            result.msg='新密码长度不能小于6位';
            return result;
        }
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg='两次密码不一致';
            return result;
        }
        //返回正常提示
        result.status=true;
        result.msg='验证通过';
        return result;
    }
}
$(function(){
    page.init();
});
/*
* @Author: Administrator
* @Date:   2018-03-07 16:36:34
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 10:05:05
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
        this.bindEvent();
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
    },
    bindEvent:function(){
        var _this=this;
        $(document).on('click','.btn-submit',function(){
            var userInfo={
                phone : $.trim($('#phone').val()),
                email :$.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res,msg){
                    _mm.successTips(msg);
                    window.location.href='./user-center.html';
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
        if (!_mm.validate(formData.password,'phone')) {
            result.msg='请输入正确手机号';
            return result;
        }
        if (!_mm.validate(formData.password,'email')) {
            result.msg='请输入正确邮箱';
            return result;
        }
        if (!_mm.validate(formData.question,'require')) {
            result.msg='密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate(formData.answer,'require')) {
            result.msg='密码提示问题答案不能为空';
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
/*
* @Author: Mrxuyc
* @Date:   2018-01-10 16:31:06
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-07 13:37:42
*/

'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');

var _mm=require('util/mm.js');
var _user=require('service/user-service.js');
/*表单的错误提示*/
var formError ={
    show:function(errorMsg){
        $('.error-item').show().find('.err-msg').text(errorMsg);
    },
    hide:function(){
        $('.error-item').hide().find('.err-msg').text('');  
    }

};
var page={
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var _this=this;
        $('#submit').click(function(){
            _this.submit();
        });
        //回车也让提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
        //用户名实时验证
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            //异步验证
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            })
        });
    },
    //提交表单
    submit:function(){
        var formData={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        },
        //表单验证结果
        validateResult= this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.register(formData,function(res){
                window.location.href='./result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate :function(formData){
        var result={
            status:false,
            msg:''
        }
        if (!_mm.validate(formData.username,'require')) {
            result.msg='用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password,'require')) {
            result.msg='密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg='密码长度不能小于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg='两次密码不一致';
            return result;
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
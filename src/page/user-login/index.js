/*
* @Author: Mrxuyc
* @Date:   2018-01-10 16:31:06
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-07 11:05:23
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
    },
    //提交表单
    submit:function(){
        var formData={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        //表单验证结果
        validateResult= this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.login(formData,function(res){
                window.location.href=_mm.getUrlParam('redirect')||'./index.html';
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
        //返回正常提示
        result.status=true;
        result.msg='验证通过';
        return result;
    }
}
$(function(){
    page.init();
});
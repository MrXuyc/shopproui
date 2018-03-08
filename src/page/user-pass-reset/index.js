/*
* @Author: Mrxuyc
* @Date:   2018-01-10 16:31:06
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-07 15:29:11
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
    data:{
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadStepUsername();
    },
    bindEvent:function(){
        var _this=this;
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            //判断用户名
            if (username) {
                _user.getQuestion(username,function(res){
                    _this.data.username=username;
                    _this.data.question=res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入用户名');
            }
        });
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //判断用户名
            if (answer) {
                _user.checkAnswer({
                    username:_this.data.username,
                    question:_this.data.question,
                    answer:answer,
                },function(res){
                    _this.data.answer=answer;
                    _this.data.token=res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入提示问题答案');
            }
        });
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //判断用户名
            if (password && password.length >= 6) {
                _user.resetPassword({
                    username:_this.data.username,
                    forgetToken:_this.data.token,
                    passwordNew:password
                },function(res){
                    window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
    },
    //加载输入用户名
    loadStepUsername:function(){
        $('.step-username').show();
    },
    //加载输入问题
    loadStepQuestion:function(){
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
                .find('.question').text(this.data.question);
    },
    //加载输入密码
    loadStepPassword:function(){
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
}
$(function(){
    page.init();
});
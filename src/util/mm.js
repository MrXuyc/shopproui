/*
* @Author: Administrator
* @Date:   2018-01-11 17:08:53
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-06 13:01:13
*/
'use strict';
var Hogan = require('hogan.js');
var conf={
    srverHost:'',

}

var _mm={
    request:function(param){
        //由于在ajax里面取不到mm对象，所以进行this
        var _this=this;
        $.ajax({
            type:param.method || 'get',
            url :param.url || '',
            dataType :param.type || 'json',
            data :param.data || '',
            success :function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //需要强制登录
                else if (10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error :function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            },
        });
    },
    //获取服务器地址
    getServerUrl:function(path){
        return conf.srverHost+path;
    },
    //获取url参数
    getUrlParam:function(name){
        //happymmall.com/product/list?keyword=xxxx&page=1
        //获取参数部分   用&分开 
        //                  以&或者是空开始 匹配name  最后以&或者字符结尾结束
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        //window.location.search  = ?keyword=xxxx&page=1
        var result=window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null 
    },
    //渲染html页面
    renderHtml:function(htmlTemplate,data){
        var template=Hogan.compile(htmlTemplate);
        var result=template.render(data);
        return result;

    },
    //成功提示
    successTips:function(msg){
        alert(msg || '操作成功!');
    },
    errorsTips:function(msg){
        alert(msg || '哪里不对了~');
    },
    //表单验证  支持非空判断  手机邮箱
    validate:function(value,type){
        //去除空格，将非字符串转换为字符串
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            //将value强转成boolean，有值为true
            return !!value;
        }
        //验证提取，防止规则变化
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin:function(){
        window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome:function(){
        window.location.href='./index.html';  
    }
};
module.exports =_mm;
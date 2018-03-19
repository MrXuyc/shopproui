/*
* @Author: Administrator
* @Date:   2018-03-19 09:29:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 11:43:41
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var templaterIndex=require('./index.string');
var _payment=require('service/payment-service.js');
var _mm=require('util/mm.js');

var page={
    data:{
        orderNumber:_mm.getUrlParam('orderNumber')
    },
    init:function(){
        //this.onLoad();
    },
    onLoad:function(){
        this.loadPaymentInfo();
    },
    //加载支付信息
    loadPaymentInfo:function(){
        var paymentHtml = '',
            _this=this,
            $pageWrap=$('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            paymentHtml = _mm.renderHtml(templaterIndex,res);
            $pageWrap.html(paymentHtml);
            //调用监听订单状态
            _this.listenOrderStatus();
        },function(errMsg){
            $pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //数据的适配
    dataFilter:function(data){
        data.needPay=data.status==10;
        dara.isCancelable=data.status==10;
    },
    listenOrderStatus:function(){
        var _this=this;
        this.paymentTimer=window.setInterval(function(){
            _payment.getPaymentStatus(this.data.orderNumber,function(res){
                if (res==true) {
                    window.location.href='./result.html?type=payment&orderNumber='
                    +_this.data.orderNumber;
                }
            },function(errMsg){
                $pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
            });
        },5e3)
    }
}
$(function(){
    page.init();
});
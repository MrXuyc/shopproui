/*
* @Author: Administrator
* @Date:   2018-03-19 09:29:52
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 11:25:35
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide=require('page/common/nav-side/index.js');
var templaterIndex=require('./index.string');
var _order=require('service/order-service.js');
var _mm=require('util/mm.js');

var page={
    data:{
        orderNumber:_mm.getUrlParam('orderNumber')
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'order-list'
        });
        this.loadOrderDetail();
    },
    bindEvent:function(){
        var _this=this;
        $(document).on('click','.order-canel',function(){
            if(window.confirm('确定要取消该订单么？')){
                _order.cancelOrder(this.data.orderNumber,function(res){
                _mm.successTips('该订单取消成功');
                _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    //加载订单列表
    loadOrderDetail:function(){
        var orderDetailHtml = '',
            _this=this,
            $content=$('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            orderDetailHtml = _mm.renderHtml(templaterIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //数据的适配
    dataFilter:function(data){
        data.needPay=data.status==10;
        dara.isCancelable=data.status==10;
    },
}
$(function(){
    page.init();
});
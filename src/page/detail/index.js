/*
* @Author: Administrator
* @Date:   2018-03-14 16:21:21
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-14 18:05:29
*/
'use strict'
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _product=require('service/product-service.js');
var _mm=require('util/mm.js');
var templateIndex  = require('./index.string');
var _cart = require('service/cart-service.js');


var page={
    data:{
        productId:_mm.getUrlParam('productId')||'',
    },
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        //如果没有传productId
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    //加载详情
    loadDetail:function(){
        var html='',
            _this=this,
            $pageWrap =  $('page-wrap');
        //loading
        $pageWrap.html('<div class="loading"></div>');
        //请求
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            html=_mm.renderHtml(templateIndex,res);
            $pageWrap.html(html);
        },function(){
            $pageWrap.html('<p class="err-tip">此商品找不到了</p>');
        })
    },
    bindEvent:function(){

    },
    //数据匹配
    filter:function(data){
        data.subImages = data.subImages.split(',');
    }
}
//加载后执行
$(function(){
    page.init();
})
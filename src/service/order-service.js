/*
* @Author: Administrator
* @Date:   2018-03-07 10:40:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 10:27:53
*/
'use strict';
var _mm = require('util/mm.js');
var _order = {
    //获取商品列表
    getProductList:function(resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        });
    },
    createOrder:function(orderInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/create.do'),
            data:orderInfo,
            success : resolve,
            error : reject
        });
    },
    getOrderList:function(listParam,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/list.do'),
            data:listParam,
            success : resolve,
            error : reject
        });
    },
    getOrderDetail:function(orderNo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/detail.do'),
            data:{
                orderNo:orderNo
            },
            success : resolve,
            error : reject
        });
    },
    canelOrder:function(orderNo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/cancel.do'),
            data:{
                orderNo:orderNo
            },
            success : resolve,
            error : reject
        });
    },
}

module.exports = _order;
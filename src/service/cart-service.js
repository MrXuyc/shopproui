/*
* @Author: Administrator
* @Date:   2018-03-14 16:26:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 15:03:47
*/
'use strict';
var _mm = require('util/mm.js');
var _cart = {
    //获取商品列表
    getCartList:function(resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/cart/list.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    selectProduct:function(productId,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/select.do'),
            data:{
                productId:productId
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    unSelectProduct:function(productId,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/un_select.do'),
            data:{
                productId:productId
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    unSelectAllProduct:function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/un_select_all.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    selectAllProduct:function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/select_all.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //更新购物车商品数量
    updateProduct:function(productInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/update.do'),
            data:productInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    deleteProduct:function(productIds,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/delete_product.do'),
            data:{
                productIds:productIds
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    
}

module.exports = _cart;
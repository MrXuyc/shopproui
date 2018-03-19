/*
* @Author: Administrator
* @Date:   2018-03-07 10:40:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-14 18:00:38
*/
'use strict';
var _mm = require('util/mm.js');
var _product = {
    //获取商品列表
    getProductList:function(listParam,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/product/list.do'),
            data : listParam,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    getProductDetail:function(productId,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/product/detail.do'),
            data : {
                productId:productId
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
}

module.exports = _product;
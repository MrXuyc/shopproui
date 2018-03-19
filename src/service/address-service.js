/*
* @Author: Administrator
* @Date:   2018-03-07 10:40:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-16 15:45:52
*/
'use strict';
var _mm = require('util/mm.js');
var _address = {
    //获取地址列表
    getAddressList:function(resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/shipping/list.do'),
            data:{
                pageSize:50,
            },
            success : resolve,
            error : reject
        });
    },
    save:function(receiverInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/shipping/add.do'),
            data:receiverInfo,
            method:'POST',
            success : resolve,
            error : reject
        });
    },
    getAddress:function(shippingId,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/shipping/select.do'),
            data:{
                shippingId:shippingId
            },
            method:'POST',
            success : resolve,
            error : reject
        });
    },
    update:function(receiverInfo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/shipping/update.do'),
            data:receiverInfo,
            method:'POST',
            success : resolve,
            error : reject
        });
    },
    deleteAddress:function(shippingId,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/shipping/delete.do'),
            data:{
                shippingId:shippingId
            },
            method:'POST',
            success : resolve,
            error : reject
        });
    },
}
module.exports = _address;
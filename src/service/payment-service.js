/*
* @Author: Administrator
* @Date:   2018-03-07 10:40:58
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 13:54:37
*/
'use strict';
var _mm = require('util/mm.js');
var _payment = {
    getPaymentInfo:function(orderNo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/pay.do'),
            data:{
                orderNo:orderNo
            },
            success : resolve,
            error : reject
        });
    },
    //获取订单状态
    getPaymentStatus:function(orderNo,resolve,reject){
         _mm.request({
            url : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data:{
                orderNo:orderNo
            },
            success : resolve,
            error : reject
        });
    },
}

module.exports = _payment;
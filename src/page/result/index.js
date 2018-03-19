/*
* @Author: Administrator
* @Date:   2018-03-06 17:25:36
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-19 14:02:16
*/
'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');

var _mm=require('util/mm.js');

$(function(){
    var type=_mm.getUrlParam('type') ||'default',
        $element = $('.'+type+'-success');
    if(type==='payment'){
        var $orderNumber=$element.find('.order-number'),
            orderNumber=_mm.getUrlParam('orderNumber');
        $orderNumber.attr('href',$orderNumber.attr('href')+orderNumber);
    }
    $element.show();

})
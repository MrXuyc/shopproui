/*
* @Author: Administrator
* @Date:   2018-03-06 17:25:36
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-06 17:58:42
*/
'use strict'
require('./index.css');
require('page/common/nav-simple/index.js');

var _mm=require('util/mm.js');

$(function(){
    var type=_mm.getUrlParam('type') ||'default',
        $element = $('.'+type+'-success');
        $element.show();

})
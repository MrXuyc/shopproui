/*
* @Author: Mrxuyc
* @Date:   2018-01-10 12:32:13
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 15:24:03
*/
'use strict';
require('page/common/header/index.js');
require('./index.css');
require('page/common/nav/index.js');
require('util/slider/index.js');
var navSide=require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm=require('util/mm.js');

$(function(){
    //渲染bannerhtml
    var bannerHtml =_mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化
    var $slider = $('.banner').unslider({
        dots: true
    });
    //前一张后一张事件
    $('.banner-con .banner-arrow').click(function(){
        var forward=$(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    });
});

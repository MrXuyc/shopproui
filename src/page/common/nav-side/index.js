/*
* @Author: Administrator
* @Date:   2018-03-06 16:17:37
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-08 10:38:50
*/
'use strict'
require('./index.css');
var _mm=require('util/mm.js');

var templateIndex = require('./index.string');
//侧边导航
var nav={
    option :{
        name:'',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
            {name:'about',desc:'关于MMall',href:'./about.html'}
        ]
    },
    init:function(option){
        //只会对第一层数据生效，会把第一个参数改变掉
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav:function(){
        //计算active数据
        for (var i = 0 ,iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }            
        }
        //渲染数据
        var navHtml = _mm.renderHtml(templateIndex,{
                navList:this.option.navList
            });
        //html放入容器
        $('.nav-side').html(navHtml);
    }
};

module.exports = nav;

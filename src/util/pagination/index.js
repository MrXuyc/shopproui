/*
* @Author: Administrator
* @Date:   2018-03-13 17:26:47
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-14 16:17:37
*/
'use strict';
require('./index.css');
var _mm=require('util/mm.js');
var templatePagination = require('./index.string');
var Pagination =function(){
    var _this=this;
    this.default={
        container :null,
        pageNum:1,
        pageRange :3,
        onSelectPage:null
    };
    //事件代理
    $(document).on('click','.pg-item',function(){
        var $this =$(this);
        if ($this.hasClass('active')||$this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage ==='function'
            ? _this.option.onSelectPage($this.data('value')):null;
    });

};
//原型继承的写法，new出来的对象可以继承这些方法
//渲染分页组件
Pagination.prototype.render=function(userOption){
    //不会影响后面的值
    this.option =$.extend({},this.defaultOption,userOption);
    //判断容器是否是合法的jquery对象
    //！的优先级高于instanceof
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    //是否只有一页
    if(this.option.pages <=1){
        return;
    }
    this.option.container.html(this.getPaginationHtml());
};
//获取分页html
Pagination.prototype.getPaginationHtml=function(){
    // |上一页| 1 2 3 4 =5= 6|下一页| 5/6 
    var html ='',
        option = this.option,
        pageArray=[],
        start = option.pageNum-option.pageRange > 0 ?option.pageNum-option.pageRange:1,
        end = option.pageNum-option.pageRange < option.pages ?option.pageNum+option.pageRange:option.pages;
    //上一页数据
    pageArray.push({
        name:'上一页',
        value:this.option.prePage,
        disabled:!this.option.hasPreviousPage
    });
    //数字按钮的处理
    for(var i = start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            active:(i=== option.pageNum)
        })
    }
    pageArray.push({
        name:'下一页',
        value:this.option.nextPage,
        disabled:!this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination,{
        pageArray:pageArray,
        pageNum:option.pageNum,
        pages:option.pages
    });
    return html;
};

module.exports=Pagination;


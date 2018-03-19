/*
* @Author: Administrator
* @Date:   2018-03-15 09:30:06
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-15 15:14:34
*/
'use strict'
require('./index.css');
require('page/common/header/index.js');
var _nav=require('page/common/nav/index.js');
var _mm=require('util/mm.js');
var templateIndex  = require('./index.string');
var _cart = require('service/cart-service.js');
var page={
    data:{

    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent:function(){
        var _this=this;
        $(document).on('click','.cart-select' ,function(){
            var $this=$(this),
                productId=$this.parents('.cart-table').data('product-id');
            //选中
            if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError(errMsg);
                });
            }
            //取消选中
            else{
                _cart.unSelectProduct(productId,function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError(errMsg);
                });
            }
        });
        //全选 取消全选
        $(document).on('click','.cart-select-all' ,function(){
            var $this=$(this);
            //选中
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError(errMsg);
                });
            }
            //取消全选 
            else{
                _cart.unSelectAllProduct(function(res){
                    _this.renderCart(res);
                },function(errMsg){
                    _this.showCartError(errMsg);
                });
            }
        });
        $(document).on('click','.count-btn' ,function(){
            var $this=$(this),
                $pCount=$this.siblings('.count-input'),
                currCount =parseInt($pCount.val()),
                type = $this.hasClass('plus')?'plus':'minus',
                productId=$this.parents('.cart-table').data('product-id'),
                minCount=1,
                maxCount=parseInt($pCount.data('max')),
                newCount=0;
            if(type==='plus'){
                if (currCount>=maxCount) {
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount=currCount+1;
            }else if (type==='minus') {
                if (currCount<=minCount) {
                    return;
                }
                newCount=currCount-1;
            }
            //更新数量
            _cart.updateProduct({
                productId:productId,
                count:newCount
            },function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError(errMsg);
            });
        });
        //删除单个商品
        $(document).on('click','.cart-delete' ,function(){
            if (window.confirm('确认要删除该商品?')) {
                var productId=$(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中的商品
        $(document).on('click','.delete-selected' ,function(){
            if (window.confirm('确认要删除选中的商品?')) {
                var arrProductIds=[],
                    $selectedItem = $('.cart-select:checked');
                for(var i =0,iLength=$selectedItem.length();i<iLength;i++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));    
                }else{
                    _mm.errorTips('你还未选中商品');
                }
            }
        });
        //提交购物车
        $(document).on('click','.btn-submit' ,function(){
            if (_this.data.cartInfo &&_this.data.cartInfo.cartTotalPrice>0) {
                window.location.href='./order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
    onLoad:function(){
        this.loadCart();
    },
    loadCart:function(){
        var _this =this;
        //获取购物车
        _cart.getCartList(function(res){
            _this.renderCart(res);
        },function(errMsg){
            $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新一下</p>');
            _this.showCartError(errMsg);
        })
    },
    renderCart:function(data){
        this.fliter(data);
        this.data.cartInfo =data;
        var html=_mm.renderHtml(templateIndex,data);
        $('.page-wrap').html(html);
        //通知导航购物车更新
        _nav.loadCartCount();
    },
    fliter:function(data){
        data.notEmpty=!!data.cartProductVoList.length;
    },
    showCartError:function(errMsg){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    },
    //删除指定商品，可批量 逗号分隔
    deleteCartProduct:function(productIds){
        var _this=this;
        _cart.deleteProduct(productIds,function(res){
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError(errMsg);
        });
    }
}
$(function(){
    page.init();
})
/*
* @Author: Administrator
* @Date:   2018-03-15 15:17:47
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-16 16:15:07
*/
'use strict'
require('./index.css');
require('page/common/header/index.js');
var _nav=require('page/common/nav/index.js');
var _mm=require('util/mm.js');
var _order=require('service/order-service.js');
var _address=require('service/address-service.js');
var productTemplateIndex  = require('./product-list.string');
var addressTemplateIndex  = require('./address-list.string');
var _addressModal =('./address-modal.js');
    
var page={
    data:{
        selectedAddressId:null
    },
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent:function(){
        var _this=this;
        //商品的选择  取消选择
        $(document).on('click','.address-item',function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId=$(this).data('id');
        });
        //订单的提交
        $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function(res){
                    window.location.href='./payment.html?orderNumber='+res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交');
            }
        });
        $(document).on('click','.address-add',function(){
            _addressModal.show({
                isUpdate:false,
                onSuccess:function(){
                    _this.loadAddressList();
                }
            });
        });
        $(document).on('click','.address-update',function(e){
            e.stopPropagation();
            var shippingId=$(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                _addressModal.show({
                isUpdate:true,
                data:res,
                onSuccess:function(){
                    _this.loadAddressList();
                }
            });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
        $(document).on('click','.address-delete',function(e){
            e.stopPropagation();
            var id=$(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址么?')){
                _address.deleteAddress(id,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    onLoad:function(){
        this.loadAddressList();
        this.loadProductList();
    },
    //加载地址列表
    loadAddressList:function(){
        var _this=this;
        $('.address-con').html('<div class="loading"></div>');
        _address.getAddressList(function(res){
            _this.renderAddress(res)
        },function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    //加载商品列表
    loadProductList:function(){
        var _this=this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){
            _this.addressFilter(res);
            _this.renderProduct(res)
        },function(errMsg){
            $('.product-con').html('<p class="err-tip">订单详情加载失败，请刷新后重试</p>');
        });
    },
    renderAddress:function(data){
        var addressListHtml = _mm.renderHtml(addressTemplateIndex,data);
        $('.address-con').html(addressListHtml);
    },
    renderProduct:function(data){
        var productListHtml = _mm.renderHtml(productTemplateIndex,data);
        $('.product-con').html(productListHtml);
    },
    //处理地址列表选中状态
    addressFilter:function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag=false;
            for(var i=0,iLength=data.list.length;i <iLength;i++){
                if(this.data.selectedAddressId === data.list[i].id){
                    data.list[i].isActive=true;
                    selectedAddressIdFlag=true;
                }
            }
            //如果以前选中的地址不在列表里 标记删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId=null;
            }
        }
    }
}
$(function(){
    page.init();
})
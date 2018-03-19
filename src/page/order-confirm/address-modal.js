/*
* @Author: Administrator
* @Date:   2018-03-16 11:05:01
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-16 15:23:02
*/
'use strict';
var _mm=require('util/mm.js');
var _address=require('service/address-service.js');
var addressModalTemplateIndex  = require('./address-modal.string');
var _cities=require('util/cities/index.js');   
var addressModal={
    show:function(option) {
        //option绑定
        this.option=option;
        this.option.data=option.data||{};
        this.$modalWrap=$('.modal-wrap');
        /*渲染页面*/
        this.loadModal();
        this.bindEvent();
    },
    hide:function(){
        this.$modalWrap.empty();
    },
    loadModal:function(){
        var addressModalHtml=_mm.renderHtml(addressModalTemplateIndex,
            {
                data:this.option.data,
                isUpdate:this.option.isUpdate
            });
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvince();
    },
    bindEvent:function(){
        var _this=this;
        //省份和城市的联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var provincename =$(this).val();
            _this.loadCities(provincename);
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){
            var receiverInfo =_this.getReceiverInfo(),
                isUpdate=_this.option.isUpdate;
            if (!isUpdate&&receiverInfo.status) {
                //新增 且验证通过
                _address.save(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else if(isUpdate&&receiverInfo.status){
                //修改 且验证通过
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                //验证不通过
                _mm.errorTips(receiverInfo.errMsg||'好像哪里不对了');
            }
        });
        //保证点击内容区时不关闭
        this.$modalWrap.find('.modal-container').click(function(e){
            //停止事件冒泡
            e.stopPropagation();
        });

        //关闭弹窗  关闭x或者其他外部区域
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });

    },
    //加载省份
    loadProvince:function(){
        var provinces =_cities.getProvinces(),
            $provinceSelect = this.$modalWrap.find('receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        if(this.option.isUpdate&&this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities:function(provincename){
        var cities =_cities.getCities(provincename),
            $citiesSelect = this.$modalWrap.find('receiver-cities');
        $citiesSelect.html(this.getSelectOption(cities));
        if(this.option.isUpdate&&this.option.data.receiverCity){
            $citiesSelect.val(this.option.data.receiverCity);
        }
    },
    //获取select的选项  输入array 输出html
    getSelectOption:function(optionArray){
        var html='<option value="">请选择</option>';
        for(var i =0 ,length=optionArray.length;i<length;i++){
            html+='<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
        }
        return html;
    },
    //获取表单信息，并验证
    getReceiverInfo:function(){
        var receiverInfo={},
            result={
                status:false           
            };
        receiverInfo.receiverName=$.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince=$.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity=$.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverAddress=$.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone=$.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip=$.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id=$.trim(this.$modalWrap.find('#receiver-id').val());
        }
        if (!receiverInfo.receiverName) {
            result.errMsg='请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg='请选择收件人所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg='请选择收件人所在城市';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg='请输入收件人收货地址';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg='请输入收件人手机号';
        }else{
            //验证通过
            result.status=true;
            result.data=receiverInfo;
        }
        return result;
    }
};
module.exports=addressModal;
// pages/Verifier/V-step2onetwo/V-step2onetwo.js
var app=getApp();
var weburl = app.globalData.weburl;
var examName = app.globalData.examName;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        examName: examName,
        showname: "各考点组织架构",
        _array: [],
        index: 0,
        examArea: "AREA_45",
        obj: {},
        sinArr:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: weburl + "sinosafe/wx/findExamAreaByExamPro.action",
            data: {
                examArea: that.data.examArea
            },
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                if (res != undefined) {
                    var data = res.data.dataMain;
                    console.log(data);
                    var newarr = {};
                    for (var i = 0, j = data.length; i < j; i++) {
                        var a = {};
                        a[data[i].examPlace] = data[i].examPlaceName;
                        newarr = Object.assign(newarr, a);
                    }
                    console.log(newarr);
                    var cityarr = ["--请选择--"];
                    for (var k in newarr) {
                        cityarr.push(newarr[k]);
                    }
                    that.setData({
                        _array: cityarr,
                        obj: newarr
                    })
                } else {
                    if (res.data.errorMsg != null
                        && res.data.errorMsg.length > 0) {
                        wx.showToast({
                            title: res.data.errorMsg,
                            duration: 2000
                        })
                    }
                }
            }
        })
    },
    bindPickerChange: function (e) {
        var that=this;
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var a = e.detail.value;
        this.setData({
            index: e.detail.value
        });
        var obj1 = this.data.obj;
        var arr1 = this.data._array;
        for (let m in obj1) {
            if (obj1[m] == arr1[a]) {
                console.log("m", m);
                wx.request({
                    url: weburl+'sinosafe//wx/findLinkManByExamPlace.action', //仅为示例，并非真实的接口地址
                    data: {
                        examPlace: m
                    },
                    method: 'POST',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        console.log(res);
                        var data = res.data.dataMain;
                        console.log(data);
                        var arrAll=[];
                        for(var i=0;i<data.length;i++){
                            var sinMan = { 
                                GroupName:"",
                                name:"",
                                remark:"",
                                phone:"",
                            };
                            sinMan.GroupName = data[i].linkGroupVo.name ;
                            sinMan.name = data[i].name ;
                            sinMan.remark = data[i].linkGroupVo.remark;
                            sinMan.phone = data[i].phone ;
                            arrAll.push(sinMan);
                        }
                        that.setData({
                            sinArr:arrAll
                        })
                    }
                })
            }
        }
    },
    reback2: function () {
        wx.redirectTo({
            url: '../V-step2/V-step2',
        })
    }

})
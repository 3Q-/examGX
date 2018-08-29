// pages/Verifier/V-step2onetwo/V-step2onetwo.js
var app=getApp();
var weburl = app.globalData.weburl;
var examName = app.globalData.examName;
Page({
    data: {
        examName: examName,
        showname: "各考点考试概况",
        _array: [],
        index: 0,
        examArea: "AREA_45",
        obj: {},
        // examPlaceTotal:"",
        examRoomTotal: "",
        superviseManTotal:"",
        mainManTotal: "",
        teacherTotal: "",
        artisanTotal: "",
        otherManTotal: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        wx.request({
            url: weburl +"sinosafe/wx/findExamAreaByExamPro.action",
            data:{
                examArea: that.data.examArea
            },
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success:function(res){
                if(res!=undefined){
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
                }else{
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
        var arr1 = this.data._array
        for (let m in obj1) {
            if (obj1[m] == arr1[a]) {
                console.log("m",m);
                wx.request({
                    url: weburl + 'sinosafe//wx/eachExamPlaceView.action', //仅为示例，并非真实的接口地址
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
                        that.setData({
                            // examPlaceTotal: data.examPlaceTotal,
                            examRoomTotal: data.examRoomTotal == null ? 0 : data.examRoomTotal,
                            superviseManTotal: data.superviseManTotal == null ? 0 : data.superviseManTotal,
                            mainManTotal: data.mainManTotal == null ? 0 : data.mainManTotal,
                            teacherTotal: data.teacherTotal == null ? 0 : data.teacherTotal,
                            artisanTotal: data.artisanTotal == null ? 0 : data.artisanTotal,
                            otherManTotal: data.otherManTotal == null ? 0 : data.artisanTotal,
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
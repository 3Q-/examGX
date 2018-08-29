// pages/Verifier/V-step2onetwo/V-step2onetwo.js
var app=getApp();
var weburl = app.globalData.weburl;
var examName = app.globalData.examName;
var downLoadUrl="";
Page({
    data: {
        examName: examName,
        showname: "各考点平面图",
        _array: [],
        index: 0,
        examArea: "AREA_45",
        obj: {},
    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            // url: weburl + "bigdata/api/examNode/getExamNodes.jspx",
            url: "https://www.examos.cn/bigdata/api/examNode/getNodeAndSerialNo.jspx",
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                if (res != undefined) {
                    var data = res.data.data;
                    // var newarr = {};
                    // for (var i = 0, j = data.length; i < j; i++) {
                    //     var a = {};
                    //     a[data[i]] = data[i].nodeName;
                    //     console.log(a);
                    //     newarr = Object.assign(newarr, a);
                    // }
                    // console.log(newarr);
                    var cityarr = ["--请选择--"];
                    for (var k in data) {
                        var arrItem = k + "-" + data[k];
                        cityarr.push(arrItem);
                    }
                    that.setData({
                        _array: cityarr,
                        obj: data
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        console.log(111111111);
        console.log(this.data._array);
        var schoolName = this.data._array[e.detail.value];
        schoolName = schoolName.split("-")[1];
        // var type_1 = ichnography;
        downLoadUrl = weburl + "bigdata/api/before/exam/download.jspx?nodeId=" + schoolName +"&type=ichnography";
        console.log(downLoadUrl);
    },
    // 一键复制
    copy:function(){ 
        if(this.data.index!==0 && downLoadUrl==""){
            wx.showToast({
                title:'暂无资源',
                icon: 'loading',
                duration:1000
            })
        } else if (this.data.index == 0 && downLoadUrl == "") {
            wx.showToast({
                title: '请先选择考点',
                icon: 'loading',
                duration: 1000
            })
        }else{
            wx.setClipboardData({
                data: downLoadUrl,
                success: function (res) {
                    wx.getClipboardData({
                        success: function (res) {
                            wx.showToast({
                                title: '复制成功',
                                icon: 'success',
                                duration: 1000
                            })
                        }
                    })
                }
            })
        }
    },
    reback2: function () {
        console.log(11111);
        wx.redirectTo({
            url: '../V-step2/V-step2',
        })
    },
    download:function(){
        if (this.data.index != 0 && downLoadUrl == ""){
            wx.showToast({
                title: '暂无资源',
                icon: 'loading',
                duration: 1000
            })
        } else if (this.data.index == 0  && downLoadUrl==""){
            wx.showToast({
                title: '请先选择考点',
                icon: 'loading',
                duration: 1000
            })
        }else{
            wx.downloadFile({
                url: downLoadUrl, 
                success: function (res) {
                    var filePath=res.tempFilePath;
                    wx.openDocument({
                        filePath: filePath ,
                        success:function(res){
                            console.log("打开文档成功")
                        },
                        fail:function(res){
                            console.log(res);
                        },complete:function(res){
                            console.log(res)
                        }
                    })
                },
                fail:function(){
                    console.log("下载失败");
                }
            })

        }
    }

})
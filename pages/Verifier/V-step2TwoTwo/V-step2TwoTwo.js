// pages/Verifier/V-step2onetwo/V-step2onetwo.js
var app = getApp();
var weburl = app.globalData.webur;
var examName = app.globalData.examName;
Page({
    data: {
        examName: examName,
        showname: "各考点考务工作会议",
        _array: [],
        index: 0,
        examArea: "AREA_45",
        obj: {},
        reportType:"",
        _array2:"",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
url:"https://www.examos.cn/bigdata/api/examNode/getNodeAndSerialNo.jspx",
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
                        var arrItem=k+"-"+data[k];
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
        var that = this;
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var a = e.detail.value;
        this.setData({
            index: e.detail.value
        });
        var obj1 = this.data.obj;
        var arr1 = this.data._array
        var workType=1;
        for (let m in obj1) {
            var arr11=arr1[a].split("-")[1];
            if (obj1[m] == arr11) {
                var nodeName = obj1[m] ;
                console.log(nodeName);
                wx.request({
                    url: "https://www.examos.cn/bigdata/api/workReport/getReportsByCond.jspx", //仅为示例，并非真实的接口地址
                    data: {
                        nodeName:nodeName,
                        workType: workType
                    },
                    method: 'GET',
                    header: {
                        'content-type': 'application/json' 
                    },
                    success: function (res) {
                        console.log(res);
                        var data = JSON.parse(res.data.dataMain);
                        // bug  返回值不唯一
                        var _array1=[];
                        var _array22=[];
                        for(var i=0;i<data.length;i++){
                                _array1.push(data[i].photoPath);
                        }
                        console.log(_array1);
                        for(var a=0;a<_array1.length;a++){
                            _array22.push(_array1[a].split(","));
                        }
                        console.log(_array22);
                        if(res!=undefined && data.length>0){  
                            console.log(_array22);
                            that.setData({
                                reportType: data[0].completeState==2 ? "已完成" : "未完成",
                                _array2: _array22[0]
                            })
                            console.log(that.data._array2);
                        }else{
                            wx.showToast({
                                title:"暂无信息",
                                duration: 2000
                            })
                        }
                    }
                })
            }
        }
    },
    reback2: function () {
        wx.redirectTo({
            url: '../V-step2/V-step2',
        })
    },
    imgYu:function(e){
        var src = e.currentTarget.dataset.src;
        console.log(src);
        var imgList=e.currentTarget.dataset.list;
        for (var i = 0; i < imgList.length;i++){
            console.log(imgList[i]);
            imgList[i] = "https://www.examos.cn/bigdata/"+ imgList[i];
            console.log(imgList[i]);
        }
        console.log(imgList);
        wx.previewImage({
            current: src,
            urls: imgList,
        })
    }

})
// fpage.js
var app = getApp();
var weburl = app.globalData.weburl;
// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../../utils/bmap-wx.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurls:[],
    imageList: [],
    canSub: true,
    array: ['一级:重大突发事件', '二级：一般突发事件', '三级：其他'],
    array1: ['1、重大自然灾害、交通事故等，考试无法正常开考', '2、系统、供电原因导致30分钟内无法开考', '3、大规模集体舞弊', '4、考生集体罢考，围攻考试工作人员', '5、考生中出现危重疾病，或大面积卫生问题','6、其它影响严重的重大突发性事件']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var placename = wx.getStorageSync("placename");
      var placeid = wx.getStorageSync("placeid");
      this.setData({
        placename: placename,
        placeid: placeid
      })
    } catch (e) {
    }
    this.getLocation();
    this.getAddress();
  },
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  getAddress: function () {
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'KxvCAjHu94fsEDMBYtrUMt8e5QDWqPc2'
    });
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      //location: this.data.latitude + "," +this.data.longitude,
      fail: (data) => {
        console.log("解析地址失败" + data)
      },
      success: (data) => {
        this.setData({
          markers: data.wxMarkerData
        });
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  formSubmit: function (e) {
    clearInterval(interval);
    this.getLocation();
    this.getAddress();
    var data = e.detail.value;
    if (this.data.array[this.data.index]) {
      if (this.data.canSub) {
        this.setData({
          canSub: false
        })
        var interval = setInterval(() => {
      try {
        var username = wx.getStorageSync("username");
        var userid = wx.getStorageSync("userid");
        var placename = wx.getStorageSync("placename");
        var placeid = wx.getStorageSync("placeid");
        if (username && userid && placename && placeid) {
          // data["examExceptionVo.examPlaceId"] = placeid;
          data["nodeName"] = placename;
          data["workType"] = "3";
          data["reportUser"] = username;
          // data["examExceptionVo.linkManId"] = userid;
          // data["examExceptionVo.loginAddr"] = this.data.markers[0].address,
          // data["examExceptionVo.loginLat"] = this.data.latitude,
          // data["examExceptionVo.loginLng"] = this.data.longitude,
          data["emergencyType"] = this.data.array[this.data.index],
            data["emergencyLevel"] = this.data.array1[this.data.index1], 
            data["photoPath"] = this.data.imgurls,
            console.log("上报前端传值", data);
          //data.photo = this.data.photo;
          if (this.data.imgurls.length === this.data.imageList.length) {
          wx.request({
            url: 'https://www.examos.cn/bigdata/api/workReport/saveOrUpdate.jspx', //仅为示例，并非真实的接口地址
            data: data,
            method: "POST",
            header: {
              "content-type": 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log("异常上报后台返值：", res)
              if (res.data != null) {
                var dataMain = res.data.dataMain;
                if (res.data.dataStatus == "1") {
                  wx.showToast({
                    title: "上报成功",
                    duration: 2000
                  })
                  setTimeout(function () {
                  wx.redirectTo({
                    url: '../FourFour/FourFour',
                  })
                  }, 2000)
                }
                else {
                  if (res.data.errorMsg != null
                    && res.data.errorMsg.length > 0) {
                    wx.showToast({
                      title: res.data.errorMsg,
                      duration: 2000
                    })
                  }
                }
              }
              //返回上一个页面
              //wx.navigateBack();
            },
            complete: () => {
              this.setData({
                canSub: true
              })
              clearInterval(interval)
            }
          })
          }
        }
      } catch (e) {
      }
      this.setData({
        canSub: true
      })
    },2000)
      }
    } else {
      wx.showToast({
        title: '请填写必要信息',
        duration: 2000
      })
    }
  },
  formReset: function () {
    this.setData({
      // photo: ''
    })
    console.log('form发生了reset事件')
  },
  //图片
  chooseImage: function () {
    var username = wx.getStorageSync("username");
    var placename = wx.getStorageSync("placename");
    wx.chooseImage({
      count: 9, // 默认9
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log("前台tempFilePaths：", tempFilePaths)
        this.setData({
          imageList: tempFilePaths,
          imgurls: []
        })
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://www.examos.cn/bigdata/api/workReport/uploadPic.jspx', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'upload',
            formData: {
              planId: 'oujvv9fdm55Bjyd9heAqb9SNRCaiH9Z7',
              reportUser: username,
              nodeName: placename,
              workType: '3',
            },
            success: (res) => {
              console.log(res)
              var data = JSON.parse(res.data);
              var dataMain = data.dataMain;
              console.log("yc照片后台返回值：", res)
              var imgUrls = this.data.imgurls;
              imgUrls.push(dataMain);
              this.setData({
                imgurls: imgUrls,
              })
            },
          })
        }
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.imageList
    })
  }
})
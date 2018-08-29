// BMdetail.js
var app = getApp();
var weburl = app.globalData.weburl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    array: ['1.物资到位情况', '2.考场布置情况（含监控）', '3.考生指引布置情况', '4.人脸通道布置情况', '5.系统部署情况', '6.应急预备准备情况', '7.封场情况'],
    array1: ['未开始', '进行中', '已完成', '其他情况'],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var zkz = options.zkz;
    var data = {
      'examineeVo.licence': zkz
    }
    console.log("详情前端传值：", data)
    wx.request({
      url: weburl + 'sinosafe/wx/findExamineeByInfo.action', //仅为示例，并非真实的接口地址
      data: data,
      method: "POST",
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data != null) {
          var dataMain = res.data.dataMain;
          if (res.data.dataStatus == "1") {
            this.setData({
              dataList: res.data.dataMain[0]
            });
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
      }
    })
  },
    //图片

  chooseImage: function () {
    wx.chooseImage({
      count: 9, // 默认9
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log("前台tempFilePaths：", tempFilePaths)
        this.setData({
          imageList: tempFilePaths
        })
        wx.uploadFile({
          url: 'https://www.examos.cn/bigdata/api/workReport/saveOrUpdateWithPic.jspx', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'upload',
          formData: { tempFilePaths },
          success: (res) => {
            var data = JSON.parse(res.data);
            var dataMain = data.dataMain;
            console.log("yc照片后台返回值：", res, dataMain)
            this.setData({
              imgurl: dataMain
            })
          }
        })
      }
    })
  },
  previewImage: function (e) {
    let index = e.target.dataset.index;
    wx.previewImage({
      current: this.data.imageList[index],
      urls: this.data.imageList
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.getLocation();
    this.getAddress();
    var data = e.detail.value;
    if (this.data.array[this.data.index]) {
      try {
        var username = wx.getStorageSync("username");
        var userid = wx.getStorageSync("userid");
        var placename = wx.getStorageSync("placename");
        var placeid = wx.getStorageSync("placeid");
        // data["examExceptionVo.examPlaceId"] = placeid;
        data["nodeName"] = placename;
        data["workType"] = "6";
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
                wx.redirectTo({
                  url: '../step2/step2',
                })
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
          fail: function () {
            consoel.log(fail)
          }
        })
      } catch (e) {
        console.log(e)
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
    wx.chooseImage({
      count: 9, // 默认9
      sourceType: ['camera', 'album'],
      sizeType: ['compressed', 'original'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log("前台tempFilePaths：", tempFilePaths)
        this.setData({
          imageList: tempFilePaths
        })
        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://www.examos.cn/bigdata/api/workReport/uploadPic.jspx', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'upload',
            formData: {
              planId: 'oujvv9fdm55Bjyd9heAqb9SNRCaiH9Z7',
              reportUser: username,
              nodeName: '广西财经学院相思湖校区',
              workType: '1',
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
})
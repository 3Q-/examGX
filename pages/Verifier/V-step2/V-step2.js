// step2.js
var app = getApp();
var template = require('../Template/Template.js');
var util = require('../../../utils/util.js')
var weburl = app.globalData.weburl;
var bmap = require('../../../utils/bmap-wx.js');
var canUseNow = app.globalData.canUseNow;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function () {
    template.tabbar("tabBar", 1, this)//1表示第二个tabbar
  },
  toallareatest: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../V-allareatest/V-allareatest'
      })
    }
  },
  toOneTwoPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
          url: '../V-step2onetwo/V-step2onetwo'
      })
    }
  },
  toOneThreePage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
          url: '../V-step2onethree/V-step2onethree'
      })
    }
  },
  toOneFourPage: function () {
      if (!canUseNow) {
          util.canUse();
      } else {
          wx.navigateTo({
              url: '../V-step2onefour/V-step2onefour'
          })
      }
  },
  toOneFivePage: function() {
      if (!canUseNow) {
          util.canUse();
      } else {
          wx.navigateTo({
              url: '../V-step2onefive/V-step2onefive'
          })
      }
  },
  toTwoOnePage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
          url: '../V-step2TwoOne/V-step2TwoOne'
      })
    }
  },
  toTwoTwoPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
          url: '../V-step2TwoTwo/V-step2TwoTwo'
      })
    }
  },
  toThreeOnePage: function () {
      this.getLocation();
    //   if (!canUseNow) {
    //       util.canUse();
    //   } else {
    //       wx.navigateTo({
    //           url: '../V-step2ThreeOne/V-step2ThreeOne'
    //       })
    //   }
  },
  getLocation: function () {
      wx.getLocation({
          type: 'wgs84',
          success: (res) => {
              var latitude = res.latitude;
              var longitude = res.longitude;
              console.log("签到位置", latitude, longitude)
              this.setData({
                  latitude: latitude,
                  longitude: longitude
              });
              this.getWeather();
              this.getAddress();
          }
      });
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
              wx.showToast({
                  title: '签到失败，请检查网络连接',
                  duration: 2000
              })
              return;
          },
          success: (data) => {
              this.setData({
                  markers: data.wxMarkerData
              });
              this.QDajax();
          }
      })
  },
  getWeather: function () {
      // 新建百度地图对象 
      var BMap = new bmap.BMapWX({
          ak: 'KxvCAjHu94fsEDMBYtrUMt8e5QDWqPc2'
      });
      // 发起regeocoding检索请求 
      BMap.weather({
          //location: this.data.latitude + "," + this.data.longitude,
          success: (data) => {
              console.log(data)
              this.setData({
                  temperature: data.currentWeather[0].temperature,
                  weatherDesc: data.currentWeather[0].weatherDesc
              });
          },
          fail: (data) => {
              console.log("解析天气失败" + data.errMsg + data.statusCode)
              console.log("解析天气失败:" + this.data.latitude + "," + this.data.longitude)
          }
      });
  },
  QDajax: function () {
      var date = new Date();
      var datefm = util.formatTime(date);
      try {
          var userid = wx.getStorageSync('userid')
          var openid = wx.getStorageSync('openid')
          if (userid) {
              var data = {
                  //date: datefm,
                  "linkManVo.lastLoginAddr": this.data.markers[0].address,
                  "linkManVo.lastLoginLat": this.data.latitude,
                  "linkManVo.lastLoginLng": this.data.longitude,
                  "linkManVo.id": userid,
                  "linkManVo.weixinId": openid
              }
              console.log("签到前端传值：", data)

              wx.request({
                  url: weburl + 'sinosafe/wx/findLinkManLogin.action',
                  data: data,
                  header: { "Content-Type": "application/x-www-form-urlencoded" },
                  method: 'POST',
                  dataType: '',
                  success: (res) => {
                      console.log("签到后台返回", res.data)
                      if (res.data != null) {
                          if (res.data.dataStatus == "1") {
                              try {
                                  wx.setStorageSync('lastTime', datefm);
                                  wx.setStorageSync('position', data["linkManVo.lastLoginAddr"]);
                              } catch (e) {
                              }
                              this.setData({
                                  lastTime: datefm,
                                  position: data["linkManVo.lastLoginAddr"]
                              });
                              wx.showToast({
                                  title: '签到成功',
                                  duration: 2000
                              })
                          } else {
                              if (data.errorMsg != null
                                  && data.errorMsg.length > 0) {
                                  wx.showToast({
                                      title: data.errorMsg,
                                      duration: 2000
                                  })
                              }
                          }
                      }
                  },
                  fail: (res) => {
                      wx.showToast({
                          title: '签到失败，请检查网络连接',
                          duration: 2000
                      })
                      return;
                  }
              })
          }
      } catch (e) {
      }
  },
  toThreeTwoPage: function () {
      if (!canUseNow) {
          util.canUse();
      } else {
          wx.navigateTo({
              url: '../V-step2ThreeTwo/V-step2ThreeTwo'
          })
      }
  },
  zhuxiao: function () {
    try {
      wx.clearStorageSync();
      wx.navigateTo({
        url: '../../login/login'
      })
    } catch (e) {
    }
  }
})
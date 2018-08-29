// step2.js
var app = getApp();
var template = require('../Template/Template.js');
var util = require('../../../utils/util.js')
var weburl = app.globalData.weburl;
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
  //事件处理函数
  //一
  toOneOnePage: function() {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../OneOne/OneOne'
      })
    }
  },
  toOneTwoPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../OneTwo/OneTwo'
      })
    }
  },
  toTwoOnePage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../TwoOne/TwoOne'
      })
    }
  },
  toTwoThreePage: function (){
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../TwoThree/TwoThree'
      })
    }
  },
  toTwoFourPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../TwoFour/TwoFour'
      })
    }
  },
  toThreeTwoPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../ThreeTwo/ThreeTwo'
      })
    }
  },
  toBMqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../BMqPage/BMqPage'
    })
    }
  },
  toZKZqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../ZKZqPage/ZKZqPage'
    });
    }
  },
  toRXqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../RXqPage/RXqPage'
    })
  }
  },
  //二
  toYCfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../YCfPage/YCfPage'
    })
    }
  },
  toYCqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../YCqPage/YCqPage'
    })
    }
  },
  toWJfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../WJfPage/WJfPage'
    })
    }
  },
  toQKqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
      wx.navigateTo({
        url: '../QKqPage/QKqPage'
      })
    }
  },
  toWJqPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../WJqPage/WJqPage'
    })
    }
  },
  //三
  toQKfPage: function () {
    if (!canUseNow) {
      util.canUse();
    } else {
    wx.navigateTo({
      url: '../QKfPage/QKfPage'
    })
    }
  },
  toThreeOnePage: function() {
    wx.navigateTo({
      url: '../ThreeOne/ThreeOne'
    })
  },
  toThreeTwoPage: function() {
    wx.navigateTo({
      url: '../ThreeTwo/ThreeTwo'
    })
  },
//四
  toFourThreePage:function () {
    wx.navigateTo({
      url: '../FourThree/FourThree'
    })
  },
  toFourFourPage: function () {
    wx.navigateTo({
      url: '../FourFour/FourFour'
    })
  },
  toQDqPage:function(){
    wx.navigateTo({
      url: '../QDqPage/QDqPage'
    })
  },
  zhuxiao:function(){
    try {
      wx.clearStorageSync();
      wx.navigateTo({
        url: '../../login/login'
      })
    } catch (e) {
    }
  }
})
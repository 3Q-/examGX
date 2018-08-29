// pages/Verifier/V-step2TwoOne/V-step2TwoOne.js
var app = getApp();
var weburl = app.globalData.weburl;
var examName = app.globalData.examName;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      examName: examName,
      showname:"全区人脸识别概况",
      subject:1,
      examPlaceId:"4501",
      count:"",
      total:"",
      missTest:"",
      passPer:"",
      missPer:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      wx.request({
          url: weburl + "sinosafe/gx/api/countByExamData.action",
          data: {
              subject: that.data.subject,
          },
          method: 'POST',
          header: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
              if (res != undefined) {
                  var data = res.data.dataMain;
                  var missTest=data.count-data.total;
                  var passPer=data.passY/data.total;
                  passPer = Number(passPer * 100).toFixed(2)+"%";
                  if (passPer=="NaN%"){
                      passPer=0;
                  }
                  var missPer=missTest/data.count;
                  missPer = Number(missPer * 100).toFixed(2)+"%";
                  if (missPer == "NaN%") {
                      missPer = 0;
                  }
                  that.setData({
                      count:data.count,
                      total:data.total,
                      missTest: missTest,
                      passPer: passPer,
                      missPer: missPer
                  })
              } else {
                if(res.data.errorMsg != null
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

  reback2: function () {
      wx.redirectTo({
          url: '../V-step2/V-step2',
      })
  }
})
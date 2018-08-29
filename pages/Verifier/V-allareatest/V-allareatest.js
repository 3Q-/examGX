// pages/Verifier/V-allareatest/V-allareatest.js
var app=getApp();
var weburl = app.globalData.weburl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      examName:"",
      showName : "全区考试概况",
      artisanTotal : "",
      examAreaTotal: "",
      examPlaceTotal: "",
      examRoomTotal:"",
      superviseManTotal: "",
      mainManTotal: "",
      teacherTotal : "",
      artisanTotal: "",
      otherManTotal: "",
      examArea: "AREA_45",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      wx.request({
          url: weburl +'sinosafe/wx/allExamAreaView.action', 
          data: {
              examArea: that.data.examArea
          },
          method: 'POST',
          header: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
              var data =res.data.dataMain;
              if(res !=undefined){
                  that.setData({
                      examName: data.examName == null ? 0 : data.examName,
                      artisanTotal: data.artisanTotal == null ? 0 : data.artisanTotal,
                      examAreaTotal: data.examAreaTotal == null ? 0 : data.examAreaTotal,
                      examPlaceTotal: data.examPlaceTotal == null ? 0 : data.examPlaceTotal,
                      examRoomTotal: data.examRoomTotal == null ? 0 : data.examRoomTotal,
                      superviseManTotal: data.superviseManTotal == null ? 0 : data.superviseManTotal,
                      mainManTotal: data.mainManTotal == null ? 0 : data.mainManTotal,
                      teacherTotal: data.mainManTotal == null ? 0 : data.mainManTotal,
                      teacherTotal: data.mainManTotal == null ? 0 : data.mainManTotal,
                      artisanTotal: data.artisanTotal == null ? 0 : data.artisanTotal,
                      otherManTotal: data.otherManTotal == null ? 0 : data.otherManTotal,
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      console.log("刷新")
      this.SJZajax();
      wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
/*
*   私有方法:   
*/ 
    //   返回页面
    tostep2: function(){
        wx.redirectTo({
            url: '../V-step2/V-step2',
        });
    }
})
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['北京市','北京市','东城区'],
    now:{},
    province:'',
    city:'',
    locat:''
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.change()
  },
  change:function(){
    var that = this;
    wx.request({
      url:'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.region[1],
        key:'d4f71f98a6bd4b5a89849027a3030a1d'
      },
      success:function(res){
        that.setData({
          now: res.data.HeWeather6[0].now,
        }),
        console.log(res.data)
      }
    }) 
  },
  getWeather:function(){
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.locat,
        key:'d4f71f98a6bd4b5a89849027a3030a1d'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          now: res.data.HeWeather6[0].now,
          province: res.data.HeWeather6[0].basic.admin_area,
          city: res.data.HeWeather6[0].basic.parent_city,
          region: [res.data.HeWeather6[0].basic.admin_area, res.data.HeWeather6[0].basic.parent_city, res.data.HeWeather6[0].basic.location]
        })
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        var locat = res.latitude.toString() +','+ res.longitude.toString()
        console.log(locat)
        that.data.locat = locat
        that.getWeather() 
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
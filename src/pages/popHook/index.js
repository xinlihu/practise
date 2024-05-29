Page({

  /**
   * 页面的初始数据
   */
  data: {
    popShowArr:[ ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },
    openPop(){
        this.setData({
            popShowArr:[1,2,3,4,5]
        });
    },
    closePop(e){
        const popId = e.detail;
        const index = this.data.popShowArr.indexOf(popId);
        this.data.popShowArr.splice(index,1);
        console.log(this.data.popShowArr)
        this.setData({
            popShowArr:this.data.popShowArr
        })
    }
})
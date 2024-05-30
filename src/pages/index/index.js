Page({
    onReady: function() {

    },
    onReachBottom(){
      this.selectComponent('#recommendList').loadMore();
    },
    
    goPopPage(){  
      wx.navigateTo({
        url:'../popHook/index'
      })
    },
    goNavigator(){
      wx.navigateTo({
        url:'../navPage/index'
      })
    }
})
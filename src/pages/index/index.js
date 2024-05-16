Page({
    onReady: function() {

    },
    onReachBottom(){
      this.selectComponent('#recommendList').loadMore();
    }
})
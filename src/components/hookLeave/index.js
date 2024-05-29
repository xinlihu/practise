const app = getApp();
Component({
    properties: {

    },
    data: {
        show:false,
        ins:this
    },
    methods: {
        onBeforeLeave(){
            if(!this.data.show) return;
            this.setData({
                show:false
            })
            if(this.getHookLeaveSwitch()){
                if(this.currentPage.popupStack.length){
                    const item = this.currentPage.popupStack.pop();
                    item.ins._beforeLeave();
                    this.onPopupStackChange();
                }
            }
        },
        getHookLeaveSwitch(){
            return this.currentPage?.popupStack && this.currentPage?.popupStack.length
        },
        openPageContainer(){
            this.setData({
                show:true
            })
        },
        closePageContainer(){
            this.setData({
                show:false
            })
        },
        onPopupStackChange(){
            if(this.getHookLeaveSwitch()){
                this.openPageContainer()
            }else{
                this.closePageContainer()
            }
        }
    },
    created: function(){

    },
    attached: function(){
        this.currentPage = getCurrentPages()[0];
        this.currentPage.popupStack = [];
        this.handlePopStackChangeBindThis = this.onPopupStackChange.bind(this); 
        app.$event.on('pop_num_change',this.handlePopStackChangeBindThis);
    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){
        app.$event.off('pop_num_change',this.handlePopStackChangeBindThis);
    },
    pageLifetimes:{
        show(){
            // if(this.getHookLeaveSwitch()){
            //     this.openPageContainer()
            // }else{
            //     this.closePageContainer()
            // }
        },

    },
});
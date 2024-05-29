import popupBehavior from '../hookLeave/behavior'
Component({
    properties: {
        show:{
            type:Boolean,
            value:false,
            },
        popId:{
            type:Number,
            value:0
        }
    },
    behaviors:[popupBehavior],
    data: {
    },
    methods: {
        handleMaskClick(){
            this.triggerEvent('close',this.data.popId);
        },
        closePop(){
            this.triggerEvent('close',this.data.popId);
        },
        openPop(){
            this.setData({
                showNew:true
            })
        }
    },
    created: function(){

    },
    attached: function(){
    
    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){

    },
});
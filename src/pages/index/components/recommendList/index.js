//Component Object
Component({
    properties: {
        myProperty:{
            type:String,
            value:'',
            observer: function(){}
        },

    },
    data: {
        recommendListData:[],
        offset:0,
    },
    methods: {
        loadMore(){
            const newData = this.requestData();
            this.selectComponent('.recycler').appendData(newData);
        },
        requestData(){
            const newData = [];
            this.data.offset +=15;
            for(let i=0;i<15;i++){
                newData.push({title:`${this.data.offset/15}-${i}`});
            }
            return newData;
        }
    },
    attached: function(){
        const initData = this.requestData();
        this.setData({
            recommendListData:initData
        })
    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){

    },
});
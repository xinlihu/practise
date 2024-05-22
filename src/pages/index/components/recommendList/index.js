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
        layoutManager:{
            getLayoutByType:function(){
                return {
                    width:750,
                    height:150
                }
            }
        },
        itemKey:{
            getKey:function(index,data){
                return data.id||index;
            }
        }
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
                newData.push({title:`${this.data.offset/15}-${i}`, id:`1000${this.data.offset+i}`});
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
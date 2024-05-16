Component({
    properties: {
        initData:{
            type:Array,
            required:true,
            observer(value){
                this.renderItem(value)
            }
        }
    },
    data: {
        // 列表所有视图区域 = 展示项 + 兜底项
        regions:[],
        // 展示项
        currentItems:[],
    },
    methods: {
        renderItem(data){
            const newData = {
                currentItems:data
            };
            this.setData(newData);
        },
        appendData(data){
            this.renderItem(this.data.currentItems.concat(data));
        }
    },
    lifetimes:{
        created(){
        }
    }
});
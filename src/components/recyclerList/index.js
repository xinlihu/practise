Component({
    properties: {
        initData: {
            type: Array,
            required: true,
            observer(value) {
                if (value.length) {
                    this.reset();
                    this.renderItem(value)
                }
            }
        },
    },
    data: {
        // 列表所有视图区域 = 展示项 + 兜底项
        regions: [],
        // 展示项
        currentItems: [],
        // 所有项的数据
        items: [],
        itemPoolMaxKey:0,
        batchUpdating:false
    },
    observer:null,
    methods: {
        // 重制数据
        reset() {
            this.data.regions = [];
            this.data.items = [];
        },
        appendData(data){
            const {length} = this.data.items;
            this.renderItem(data,length);
        },
        renderItem(data, begin) {
            const incremental = begin !== undefined;
            let baseLength = 0;
            if(incremental){
                baseLength = this.getItemsLength(begin);
            }
            const [dataWithLayout, dataLength] = this.getDataWithLayout(baseLength,data,begin);
            const key = `regions[${this.data.regions.length}]`;
            const newData={};
            if(incremental){
                newData[key] = {
                    visible:true,
                    offset:baseLength,
                    height:dataLength,
                    indexes:[begin||0, (begin||0)+data.length]
                }
                dataWithLayout.forEach((item,index)=>{
                    this.data.items[begin+index] = item;
                    const {recyclerKey, position} = this.reuseItem(item.key);
                    newData[`currentItems[${position}]`] = {
                        visible: true,
                        recyclerKey,
                        origin:item
                    }
                });
            }else{
                this.data.items = dataWithLayout;
                newData.currentItems = dataWithLayout.map((item)=>{
                    const {recyclerKey} = this.reuseItem(item.key);
                    return {
                        visible:true,
                        recyclerKey,
                        origin:item
                    }
                });
                newData.regions= [
                    {
                        visible: true,
                        offset: baseLength,
                        height:dataLength,
                        indexes:[begin||0, (begin||0)+data.length]
                    }
                ];
            }
            this.setData(newData,()=>{
                this.observerItems();
            })
        },
        getDataWithLayout(baseLength, data, begin){
            let length = baseLength;
            const layout = {width:750,height:150}
            const layoutList = data.map((item,index)=>{
                const key = item.id;
                const offset = length;
                length += layout.height;
                return {
                    index: index+(begin||0),
                    key:key,
                    offset,
                    height:layout.height,
                    width:layout.width,
                    data:item
                }
            });
            return [layoutList,length-baseLength];
        },
        // 获取对应索引值的列表高度
        getItemsLength(index){
            const item = this.data.items[index - 1];
            const baseLength = item.offset + item.height;
            return baseLength;
        },
        reuseItem(originKey, offset, useExisted) {
            // 下拉的时候要把隐藏的再显示出来
            if(useExisted){
                const preIndex = this.data.currentItems.findIndex(item=>item.origin.offset === offset && item.origin.key === originKey);
                if(preIndex > -1){
                    const item = this.data.currentItems[preIndex];
                    const existed = item.visible;
                    if(!item.visible){
                        item.visible = true;
                    }
                    return{
                        recyclerKey:item.recyclerKey,
                        position:preIndex,
                        existed
                    }
                }
            }
            // renderItem的时候找到可复用的元素
            const regionsLen = this.data.regions || [];
            const reusedIndex = this.data.currentItems.findIndex(item=>!item.visible && regionsLen.length > 1);
            if(reusedIndex > -1){
                const item = this.data.currentItems[reusedIndex];
                if(!item.visible){
                    item.visible = true;
                }
                return{
                    recyclerKey:item.recyclerKey,
                    position:reusedIndex,
                    existed:false
                }
            }
            // 新增一个recycler item
            const recyclerKey = this.data.itemPoolMaxKey + 1;
            const position = this.data.itemPoolMaxKey;
            this.data.itemPoolMaxKey = recyclerKey;
            return {recyclerKey, position, existed:false};
        },
        releaseItem(position){
            const item = this.data.currentItems[position];
            if(item?.visible === true){
                item.visible = false;
            }
        },
        observerItems(){
            const originObserver = this.observer;
            this.observer = this.createIntersectionObserver({observeAll:true});
            this.observer.relativeToViewport({
                top:200,
                bottom:200
            }).observe('.observer',(res)=>{
                const regionIndex = res.dataset.index;
                const visible = res.intersectionRatio !== 0;
                this.enqueueUpdateQueue(regionIndex, visible);
            });
            if(originObserver) originObserver.disconnect();
        },
        enqueueUpdateQueue(regionIndex,visible){
            if(this.updateQueue === undefined) this.updateQueue = new Map();
            const currentVisible = this.updateQueue.get(regionIndex);
            if(currentVisible !== undefined && currentVisible !== visible){
                this.updateQueue.delete(regionIndex);
            }
            this.updateQueue.set(regionIndex,visible);
            if(this.data.batchUpdating) return;
            this.data.batchUpdating = true;
            this.batchUpdateItem(this.updateQueue);
        },
        batchUpdateItem(updateQueue){
            const newData = {};
            const currentItemMap = new Map();
            this.data.currentItems.forEach((item,index)=>{
                currentItemMap.set(item.origin.key,index);
            });
            updateQueue.forEach((visible,regionIndex)=>{
                const region = this.data.regions[regionIndex];
                if(region?.indexes){
                    const [start,end] = region.indexes;
                    for(let i = start; i< end;i++){
                        const item = this.data.items[i];
                        // 复用
                        if(visible){
                            const {recyclerKey,position,existed} = this.reuseItem(item.key,item.offset,true);
                            if(!existed){
                                newData[`currentItems[${position}]`] = {
                                    visible:true,
                                    recyclerKey,
                                    origin:item
                                }
                            }
                        }
                        // 回收
                        else{
                            const position = currentItemMap.get(item.key);
                            this.releaseItem(position);
                        }
                    }
                    if(this.data.regions[regionIndex].visible!==visible){
                        newData[`regions[${regionIndex}].visible`] = visible;
                    }
                }
            });
            this.setData(newData);
            this.updateQueue = new Map();
            setTimeout(()=>{
                if(this.updateQueue.size === 0){
                    this.data.batchUpdating = false;
                }else{
                    this.batchUpdateItem(this.updateQueue);
                }
            },16)
        }
    },
    lifetimes: {
        created() {
        }
    }
});
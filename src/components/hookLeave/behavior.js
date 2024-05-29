export default Behavior({
    attached(){
        this.currentPage =  getCurrentPages()[0];
        const {popId} = this.data;
        this.currentPage.popupStack.push(
            {
                popId,
                ins:this
            }
        )
        getApp().$event.emit('pop_num_change');
    },
    detached(){
        this._closeSelf();
    },
    methods:{
        _beforeLeave(){
            this.closePop();
        },
        _closeSelf(){
            if(!this.currentPage?.popupStack) return;
            const index = this.currentPage.popupStack.findIndex(item=>item.ins === this)
            if(index > -1){
                this.currentPage.popupStack.splice(index,1);
                getApp().$event.emit('pop_num_change');
            }
        }
    }
    
})
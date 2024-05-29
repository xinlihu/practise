function behaviorFactory(type){
    return Behavior({
        lifetimes:{
            attached(){
                this.$recycleType = type;
                send(this,"register",this);
            },
            detached(){
                send(this,"inject",this);
            }
        }
    })
}

function send(context,type,params){
    context.triggerEvent('__recyclerContextBridge',{type,params},{bubbles:true,composed:true});
}

export default behaviorFactory;
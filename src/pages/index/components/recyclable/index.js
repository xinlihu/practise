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

    },
    methods: {
        handler(e){
            const {type, params} = e.detail;
            const instances = this.getInstances(params);
            if(type === 'register'){
                instances.add(params);
            }else{
                instances.delete(params)
            }
        },
        getInstances(recyclable){
            let instances = this.instances.get(recyclable.$recycleType);
            if(instances === undefined){
                instances = new Set();
                this.instances.set(recyclable.$recycleType, instances);
            }
            return instances;
        },
        reuse(states){
            this.instances.forEach((instances,type)=>{
                let index = 0;
                const state = states && states[type];
                instances.forEach((instance)=>{
                    try{
                        if(state&& state[index] !==undefined){
                            instance?.reuse(state[index]);
                            index+=1;
                        }
                    }catch(error){
                        console.error(error);
                    }
                })
            })
        },
        reset(){
            const states = {};
            let hasState = false;
            this.instances.forEach((instances)=>{
                instances.forEach((instance)=>{
                    try{
                        const state = instance?.reset();
                        if(state !== undefined){
                            hasState = true;
                            if(states[type] === undefined){
                                states[type] = []
                            }
                            states[type].push(state)
                        }
                    }catch(error){
                        console.error(error);
                    }
                })
            })
            if(hasState) return states;
        }
    },
    created: function(){
        this.instances = new Map();
    },
    attached: function(){
        this.triggerEvent('register',this);
    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){
        this.triggerEvent('inject',this);
    },
});
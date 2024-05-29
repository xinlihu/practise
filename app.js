import EventBus from "./src/modules/eventBus";
import { init, executeTask } from "./src/modules/schedular";

App({
    onLaunch(options){
        init();
        executeTask('high')
    },
    onShow(options){
        this.$event = new EventBus();
        executeTask('low')
    },
    onHide(){

    },
    onError(msg){
        console.log(msg);
    },
    globalData: 'I am global data'
})
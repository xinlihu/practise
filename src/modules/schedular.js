var taskExecutor;
var tags=[];
var tasks;
const TaskStatus ={
    init:0,
    Wait:1,
    Running:2,
    Success:3,
    Fail:4
}
class Task{
    constructor(tag,runnable){
        this.tag = tag;
        this.run = runnable;
        this.status = TaskStatus.init;
    }
    dispatch(){
        this.status = TaskStatus.Running;
        debugger;
        this.run();
    }
}
export function init(){
    tasks = {};
    const executor = new Map();
    executor.set("high",["high_task1","high_task2"]);
    tasks['high_task1']=new Task('high_task1',high_task1);
    tasks['high_task2']=new Task('high_task2',high_task2);
    executor.set("low",["low_task1","low_task2"]);
    tasks['low_task1']=new Task('low_task1',low_task1);
    tasks['low_task2']=new Task('low_task2',low_task2);
    taskExecutor = executor;
}
export function executeTask(key){
    const executors = taskExecutor;
    if(!executors) return;
    const taskExe = executors.get(key);
    if(taskExe){
        taskExe.forEach(e=>{
            dispatchTask(e);
        });
        executors.delete(key);
    }
}
function dispatchTask(tag){
    let task;
    debugger;
    tags.push(tag);
    task = tasks[tag];
    tags.pop();
    if(task){
        task.dispatch();
    }
}


function high_task1(){
    console.log('执行任务：high_task1');
}
function high_task2(){
    console.log('执行任务：high_task2');
}
function low_task1(){
    console.log('执行任务：low_task1');
}
function low_task2(){
    console.log('执行任务：low_task2');
}
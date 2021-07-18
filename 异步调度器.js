class Scheduler {
    constructor(maxNum) {
      this.waiting = [];
      this.doing = [];
      this.count = 0;
      this.maxNum = maxNum;
      this.cur = 0;
      this.queue = [];
    }
    add(promiseCreator) {

        return new Promise((resolve, reject) => {
            promiseCreator.resolve = resolve;
            if(this.doing.length<2) {
                this.doTask(promiseCreator);
            }else {
                this.waiting.push(promiseCreator);
            }
        })
    }
    doTask(promiseCreator) {
        this.doing.push(promiseCreator);
        promiseCreator().then(() => {
            promiseCreator.resolve();
            this.removeTask(promiseCreator);
            if(this.waiting.length>0) {
                this.doTask(this.waiting.shift());
            }
        })
    }
    removeTask(promiseCreator) {
        let idx = this.doing.indexOf(promiseCreator);
        this.doing.splice(idx,1);
    }
  }
  
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  const scheduler = new Scheduler(2);
  const addTask = (time, order) => {
    scheduler.add(()=>timeout(time)).then(()=>console.log(order));
  }
  addTask(1000, '1');
  addTask(500, '2');
  addTask(300, '3');
  addTask(400, '4');

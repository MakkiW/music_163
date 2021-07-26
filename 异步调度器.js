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


  // 字节面试题，实现一个异步加法
function asyncAdd(a, b, callback) {
    setTimeout(function () {
      callback(null, a + b);
    }, 500);
  }
  
  // 解决方案
  // 1. promisify
  const promiseAdd = (a, b) => new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
  
  // 2. 串行处理
  async function serialSum(...args) {
    return args.reduce((task, now) => task.then(res => promiseAdd(res, now)), Promise.resolve(0))
  }
  
  // 3. 并行处理
  async function parallelSum(...args) {
    if (args.length === 1) return args[0]
    const tasks = []
    for (let i = 0; i < args.length; i += 2) {
      tasks.push(promiseAdd(args[i], args[i + 1] || 0))
    }
    const results = await Promise.all(tasks)
    return parallelSum(...results)
  }
  
  // 测试
  (async () => {
    console.log('Running...');
    const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res1)
    const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
    console.log(res2)
    console.log('Done');
  })()

let sequence = []
const limitLoad = (urls, handler, limit) =>  {
    let promises = urls.splice(0,limit).map((item, index) => {
        return handler(item).then(()=>{
            return index
        })
    })
    return urls.reduce((prev, curUrl) => {
        return prev.then(()=> {
            return Promise.race(promises)
        }).then(fastIdx => {
            promises[fastIdx] = handler(curUrl).then(()=>{
                return fastIdx
            })
        })
    }, Promise.resolve())
    .then(() => {
        return Promise.all(promises)
    })
}
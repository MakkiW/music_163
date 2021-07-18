const PENDING = "pending";
const FULFILLED = "fulfilled"
const REJECTED = "rejected";
//onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise
const resolvePromise = (promise, x, resolve, reject) => {
    /**
     * //如果x是一个promise
        if (x instanceof MyPromise) {
            // 拆解这个 promise ，直到返回值不为 promise 为止
            if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(promise, y, resolve, reject);
            }, error => {
                reject(error);
            });
            } else {
                x.then(resolve, reject);
            }
        } else {
            // 非 Promise 的话直接 resolve 即可
            resolve(x);
        }
     */
    if(x===promise) {
        reject(new TypeError('循环引用'));
    }
    if(x !== null && typeof x === 'object' || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            //x为promise
            if(typeof then === 'function') {
                then.call(x, y=>{  //then.call(this值, onfulfilled, onrejected)，y为resolve的结果
                    if(called) return;
                    called = true;
                    resolvePromise(promise, y, resolve, reject);
                }, r => {
                    if(called) return;
                    called = true;
                    reject(r);
                })
            }else {
                resolve(x);
            }
        }catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    }else {
        resolve(x);
    }
}

function MyPromise(excutor){
    let that = this;
    that.status = PENDING;
    that.value = undefined;  //fulfilled状态时返回的信息
    that.reason = undefined; //rejected状态返回信息
    that.onFulfilledCallbacks=[]; //实现链式回调
    that.onRejectedCallbacks=[];
    function _resolve(value) {
        if(value instanceof MyPromise) {
            return value.then(_resolve,_reject);
        }
        setTimeout(() => {  //确保onFulfilled/onRejected方法异步执行，且在then被调用那一轮循环之后的新执行栈执行，
            //保证new Promise()中的resolve/reject成功执行，防止出现then方法未执行，导致回调函数未注册的情况
            if(that.status === PENDING) {
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        });
    }
    function _reject(reason) {
        setTimeout(() => {
            if(that.status === PENDING) {
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        })
    }

    try {
        excutor(_resolve,_reject);
    } catch(e) {
        _reject(e);
    }
}


MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    let newPromise;
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    onFulfilled = typeof onFulfilled === "function"? onFulfilled:value=>value;
    onRejected = typeof onRejected === "function"? onRejected: reason => {throw reason;};
    // 当状态已经变为resolve/reject时,直接执行then回调
    if(that.status === FULFILLED) {
        return newPromise=new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise,x,resolve,reject); //该函数目的是将x彻底resolve
                    //简易版： x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
                }catch(e) {
                    reject(e);
                }
            })
        });
    }
    if(that.status === REJECTED) {
        return newPromise=new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                }catch(e) {
                    reject(e);
                }
            });
        });
    }
    // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
    if(that.status === PENDING) {
        return newPromise = new MyPromise((resolve, reject) => {
            //实现异步操作的串行，将回调函数注册在调用then的promise中
            that.onFulfilledCallbacks.push(value => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                }catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push(reason => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise,x,resolve, reject);
                }catch(e) {
                    reject(e);
                }
            });
        });
    }
}

MyPromise.all = function(promises) {
    return new MyPromise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            throw new TypeError();
        }
        let resolvedCnt = 0;
        let promiseNum = promises.length;
        let resolvedRes = [];
        for(let i=0; i<promiseNum; i++) {
            MyPromise.resolve(promises[i]).then( value => {  //用resolve避免promise[i]不是promise
                resolvedCnt++;
                resolvedRes[i]=value;
                if(resolvedCnt === promiseNum) {
                    return resolve(resolvedRes);
                }
            }).catch(err => {
                reject(err);
            })
        }
    })
}
MyPromise.race = function(promises) {
    return new MyPromise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            throw new TypeError();
        }
        let promiseNum = promises.length;
        for(let i=0; i<promiseNum; i++) {
            MyPromise.resolve(promises[i]).then( value => {  //用resolve避免promise[i]不是promise
                resolve(value);
                return;
            }).catch(err => {
                reject(err);
                return;
            })
        }
    })
}

MyPromise.prototype.catch = function(rejectFn) {
    return this.then(undefined, rejectFn)
}

MyPromise.prototype.finally = function(callback) {
    return this.then(value => {
        //finally()如果return了一个reject状态的Promise，将会改变当前Promise的状态，这个MyPromise.resolve就用于改变Promise状态
        return MyPromise.resolve(callback()).then( () => {
            return value;
        })
    }, error => {
        return MyPromise.reject(callback()).then(() => {
            return error;
        })
    })
}                                                     

/**
 * Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。如果该值为promise，
 * 返回这个promise；如果这个值是thenable（即带有"then" 方法)），返回的promise会“跟随”这个thenable的
 * 对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。

 */

//静态的resolve方法
MyPromise.resolve = function(value) {
    if (value && value instanceof Promise) {
        return value;
    } else if (value && typeof value === 'object' && typeof value.then === 'function'){
        let then = value.then;
        return new Promise(resolve => {
            then(resolve);
        });
    } else if (value) {
        return new Promise(resolve => resolve(value));
    } else {
        return new Promise(resolve => resolve());
    }

}

MyPromise.reject = (reason) => {
    return new MyPromise((resolve, reject) => reject(reason))
}
function EventEmitter() {
    this.listeners = {};  //存放事件监听函数
    this.maxListener = 10;
}

EventEmitter.prototype.on = function(event, cb) {
    let listeners = this.listeners;
    if(listeners[event] && listeners[event].length >= this.maxListener) {
        throw console.error("监听器的最大数量是:%d,您已超出限制", this.maxListener);
    } 
    if(listeners[event] instanceof Array) {
        if(listeners[event].indexOf(cb) === -1) {
            listeners[event].push(cb);
        }
    }else {
        listeners[event] = [].concat(cb);
    }
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.emit = function(event) {
    let args = Array.prototype.slice.call(arguments);
    args.shift();
    this.listeners[event].forEach(cb => {
        cb.apply(null, args);
    });
}

EventEmitter.prototype.removeListener =  function (event, listener) {
    let listeners = this.listeners;
    let arr = listeners[event] || [];
    let i = arr.indexOf(listener);
    if(i>=0) {
        listeners[event].splice(i,1);
    }
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.once = function(event, listener) {
    let self = this;
    function wrap() {
        let args = Array.prototype.slice.call(arguments); //传入的listener的参数
        listener.apply(null,args);
        self.removeListener(event,wrap);
    }
    this.on(event,wrap);
}

EventEmitter.prototype.removeAllListeners = function(event) {
    this.listeners[event] = [];
}

EventEmitter.prototype.listeners = function(event) {
    return this.listeners[event];
}

EventEmitter.prototype.setMaxListeners = function(num) {
    this.maxListener = num;
}
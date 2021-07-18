function myNew(ctor, ...args) {
    if(typeof ctor !== 'function') {
        throw new Error('wrong');
    }
    let obj = new Object(); //1
    obj.__proto__ = Object.create(ctor.prototype); //2
    let res = ctor.apply(obj, args); //3
    /*需要判断构造函数执行后返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么，当返回对象时，实例只能访问到
    返回的对象中的属性，构造函数中赋值的其他属性为undefined*/
    let isObject = typeof res === 'object' && typeof res !== null;
    let isFunction = typeof res === 'function';
    return isObject || isFunction? res:obj;  //4
}

//当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
function myBind(context, ...args) {
    //返回一个绑定了context的函数
    if(typeof this !== 'function') {
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var self = this; //保存this值，它代表调用bind的函数
    
    var fNOP = function(){};
    var fbound = function () {
        /* 当作为构造函数时，this 指向实例，此时结果为 true，
        将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        eg. var foo = {value: 1}
            function bar(name,age) {
                this.name=name
                this.age = age
            }
            var bindFoo = bar.bind(foo, 'daisy')
            var obj = new bindFoo('19')
            
        当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context*/
        self.apply(this instanceof fNOP? this:context, args.concat(Array.prototype.slice(arguments)));
    }
    //寄生组合继承，保证构造函数原型对象上的属性不能丢失
    
    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    //fbound.prototype = Object.create(this.prototype);
    return fbound; //返回一个函数
}

function myCall(context, ...args) {
    var context = context || window;  //可以传this为null,此时this指向window
    context.fn = this;  //调用myCall的函数
    /**老写法
     * var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');
     */
    var result = eval('context.fn(...args)'); //ES6的写法
    delete context.fn;
    return result;
}

function myApply(context, args) {
    var context = context || window;
    context.fn = this; //调用apply的函数
    /**老写法
     * var _args = [];
        for (var i = 0, len = args.length; i < len; i++) {
            _args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
     */
    var result = eval('context.fn(...args)'); //扩展运算符，将数组变为序列
    delete context.fn;
    return result;
}


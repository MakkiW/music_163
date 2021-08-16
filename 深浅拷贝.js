//浅拷贝
//1.
let obj = {name:'xx',age:18};
const obj2 = Object.assign({},obj);  //Object.assign(target, 源,...)
//2.
let arr = [1,2,3];
let newarr = arr.concat();
//3. slice()
//4.
let newArr = [...arr];

//深拷贝
//1
//JSON.parse(JSON.stringify(source));
//2.
const getType = obj => Object.prototype.toString.call(obj);
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;
//判断target是否可遍历
const canTraverse = {
    '[object Map]': true,
    '[object Set]':true,
    '[object Array]':true,
    '[object Object]':true,
    '[object Arguments]':true
};
const mapTag = '[object Map]';
const setTag = '[object Set]';

const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

const dateTag = '[object Date]';
const errorTag = '[object Error]';

const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const handleRegExp = (target) => {
    const {source, flags} = target;
    return new RegExp(source,flags); //eg. /xxx/g中 xxx为source, g为flags，两者都为字符串
}

const handleFunc = (func) => {
    if(!func.prototype) return func; //箭头函数没有原型，直接返回自身
    const bodyReg = /(?<={)(.|\n)+(?=})/m; //?=<表示匹配以{开头后面的字符串，并捕获到分组中，?=表示匹配以}结尾...
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();

    const param = paramReg.exec(funcString); //返回数组，获取到的内容不包括（）
    const body = bodyReg.exec(funcString);  //获取到的内容不包括{}
    if(!body) return null;
    if(param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr,body[0]); //参数都为字符串
    }else {
        return new Function(body[0]);
    }
}

const handleNotTraverse = (target,tag) => {
    const Ctor = target.constructor;
    switch(tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

const deepClone = (target, map = new WeakMap()) => {  //用weakmap避免强引用
    if(!isObject(target)) {
        return target;
    }
    let type = getType(target);
    let cloneTarget;
    //处理不可遍历对象
    if(!canTraverse[type]) {
        return handleNotTraverse(target,type);
    }else {
        let ctor = target.constructor;
        cloneTarget = new ctor(); //保证对象的原型不丢失
    }
    //循环引用问题
    if(map.get(target)) {
        return target;
    }
    map.set(target, true);
    
    //map
    if(type === mapTag) {
        target.forEach((item, key) => {
            cloneTarget.set(deepClone(key,map),deepClone(item,map));
        })
    }
    //set
    if(type === setTag) {
        target.forEach(item => {
            cloneTarget.add(deepClone(item));
        })
    }
    //处理数组和对象
    for(let prop in target) { //若为数组，此时prop为下标
        //hasOwnProperty会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
        if(target.hasOwnProperty(prop)) {
            cloneTarget[prop] = deepClone(target[prop],map);
        }
    }
    return cloneTarget; 
}
let obj3 = {
    a:1
}
let obj4 = {
    b:2,
    c:obj3,
}
obj3.d = obj4;
let res = deepClone(obj3);
console.log(res)
//console.log(JSON.parse(JSON.stringify(obj3)));

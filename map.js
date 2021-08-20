/**
 * var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
  }[, thisArg])
 */
Array.prototype._map = function(func,thisArg) {
    return this.reduce((prev, cur, idx) => {
        prev.push(func.call(thisArg, cur, idx));
        return prev; //要有返回
    }, []);
}

Array.prototype.__map = function(fn) {
  if (typeof fn !== "function") {
       throw Error('参数必须是一个函数');
   }
   const res = [];
   for (let i = 0, len = this.length; i < len; i++) {
       res.push(fn(this[i]));
   }
   return res;
}

//arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
Array.prototype._reduce = function(fn, base) {
    let initialArr = this; //复制数组
    let arr = initialArr.concat();
  
    if (base) arr.unshift(base);
    let index, newValue;
  
    while (arr.length > 1) {
      index = initialArr.length - arr.length + 1;
      newValue = fn.call(null, arr[0], arr[1], index, initialArr);
  
      arr.splice(0, 2, newValue); // 直接用 splice 实现替换，移除前两个，再插入new
    }
  
    return newValue;
  };

  arr = [1,2,3];
  let res = arr._reduce((prev,cur,idx) => prev + cur,1);
  console.log(res);

  //var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
  Array.prototype.fakeFilter = function fakeFilter(fn, context) {
    if (typeof fn !== "function") {
      throw new TypeError(`${fn} is not a function`);
    }
    
    let arr = this;
    let temp = [];
  
    for (let i = 0; i < arr.length; i++) {
      let result = fn.call(context, arr[i], i, arr);
      if (result) temp.push(arr[i]);
    }
    return temp;
  };

//String.prototype.repeat(n)  
//repeat() 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
//输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。
function repeat(s, n) {
    return (new Array(n + 1)).join(s);
}

//递归：
function repeat(s, n) {
    return (n > 0) ? s.concat(repeat(s, --n)) : "";
}


//防抖：在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行。有时候不希望非要等到事件停止触发后才执行，
//希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行
function debound(func,wait, immediate) {
    let timer = null;
    return function() {
        const context = this;
        const args = arguments;  //js的事件执行函数的参数会传入event
        if(timer) clearTimeout(timer); //清除，但timer操作后不为null
        if(immediate) {
            const callNow = !timer;//根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数,如果已经执行过，不再执行
            timer = setTimeout(() => {
                timer = null;  //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
            }, wait);
            if(callNow) {
                var result = func.apply(context, args);
            }
        }else {
            timer = setTimeout(() => {
                func.apply(context, args); //apply为了纠正this的指向，若不改变，则this在函数执行时会指向window
            }, wait);
        }
        return result //立即执行的情况下可能有函数的返回值
    }
}

//节流：不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数
//时间戳
function throttle(func, wait) {
    let prev = Date.now();
    return function() {
        let context = this;
        let args = arguments;
        let now = Date.now();
        if(now-prev >= wait) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}
//定时器
function throttle2(func, wait) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(!timer) {
            timer = setTimeout(() => {
                func.apply(context, args);
                timer = null;
            }, wait);
        }
    }
}

/*区别在于，使用时间戳实现的节流函数会在第一次触发事件时立即执行，以后每过 delay 秒之后才执行一次，
并且最后一次触发事件不会被执行；而定时器实现的节流函数在第一次触发时不会执行，而是在 delay 秒之后才执行，
当最后一次停止触发后，还会再执行一次函数。
 */
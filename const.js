//在浏览器运行
function _const(data, value) {
    window.data = value; //把要定义的data挂载到window下，并赋值value
    Object.defineProperty(window, data, {
        enumerable: false,
        configurable: false,  
        get: function() {
            return value;
        },
        set: function(newVal) {
            if(newVal !== value) {
                throw new TypeError('Assignment to constant variable.');
            }else {
                return value;
            }
        }
    });
}

_const('a',10);
console.log(a);
a = 15;
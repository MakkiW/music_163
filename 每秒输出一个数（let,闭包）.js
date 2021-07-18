/**
 * for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000 * i)
}

for (let i = 0; i < 10; i++) {
    (function(j) {
        setTimeout(() => {
            console.log(j);
        }, 1000 * j)
    })(i);
}


*/

const arr = [1, 2, 3]
arr.reduce((p, x) => {
  return p.then(() => {
      //返回promise是为了用resolve
    return new Promise(r => {
      setTimeout(() => r(console.log(x)), 1000)
    })
  })
}, Promise.resolve())
 
let arr = [1,2,3,4]
async function sleep() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}
(async () => {
    for(let i in arr){
        await sleep ();
        console.log(arr[i]);
    }
})()
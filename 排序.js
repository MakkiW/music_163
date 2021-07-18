//冒泡
function bubbleSort(arr) {
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

//冒泡优化
function bubbleSort2(arr) {
    for(let i=0; i<arr.length; i++) {
        let change = false;
        for(let j=0; j<arr.length-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                change = true;
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
        if(!change) { //本轮没有交换，说明排序完成
            break;
        }
    }
    return arr;
}
//console.log(bubbleSort2([6,1,4,6,3,9,2]))

//快排
//分区，每次把小于pivotVal的扔到前面，然后i+1为pivot的正确位置
//取随机值：Math.floor(Math.random()*10);  可均匀获取0-9的随机值
function partition(arr, left, right) {
    let pivotIdx = right, pivotVal = arr[right];
    let i = left-1;
    for(let j=left; j < right; j++) {
        if(arr[j] <= pivotVal) {  //是<=
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i+1];
    arr[i+1] = arr[pivotIdx];
    arr[pivotIdx] = temp;
    return i+1;  //是i+1
}
function quickSort(arr, left, right) {
    if(left <= right) {
        let pivot = partition(arr, left, right);
        quickSort(arr,left,pivot-1);
        quickSort(arr,pivot+1, right);
    }
}


//堆排，大根堆：父节点大于两个子结点
//传入一个未排序的数组，某个下标为i的元素的左右子结点下标分别为i*2+1, i*2+2
function maxHeapify(arr, index, heapSize) {
    let leftIdx = index*2+1, rightIdx = index*2+2, largestIdx = index;
    if(leftIdx < heapSize && arr[leftIdx] > arr[largestIdx]) {
        largestIdx = leftIdx;
    }
    if(rightIdx < heapSize && arr[rightIdx] > arr[largestIdx]) {
        largestIdx = rightIdx;
    }
    if(largestIdx !== index) {
        let temp = arr[index];
        arr[index] = arr[largestIdx];
        arr[largestIdx] = temp;
        maxHeapify(arr,largestIdx,heapSize);
    }
}

function buildMaxHeap(arr, heapSize) {
    for(let i=~~(heapSize/2); i>=0; i--) {
        maxHeapify(arr, i, heapSize);
    }
}

function heapSort(arr) {
    let heapSize = arr.length;
    buildMaxHeap(arr,heapSize);
    for(let i=arr.length-1; i>0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapSize--;
        maxHeapify(arr, 0, heapSize);
    }
}



//归并排序,稳定
function mergeSort(arr) {
    if(arr.length <= 1) return arr		//数组元素被划分到剩1个时，递归终止
    const midIndex = arr.length/2 | 0
    const leftArr = arr.slice(0, midIndex)
    const rightArr = arr.slice(midIndex, arr.length)
    return merge(mergeSort(leftArr), mergeSort(rightArr))	//先划分，后合并
}

//合并
function merge(leftArr, rightArr) {
    const result = []
    while(leftArr.length && rightArr.length) {
    	leftArr[0] <= rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift())
    }
    while(leftArr.length) result.push(leftArr.shift())
    while(rightArr.length) result.push(rightArr.shift())
    return result
}

let arr = [5,4,3,2,1,12,6,9,2,8];

console.log(mergeSort(arr));
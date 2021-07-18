#### webpack热更新

https://juejin.cn/post/6844904008432222215

### NodeJS

https://juejin.cn/post/6844903495842136077

###### __dirname:

Node.js 中，`__dirname` 总是指向被执行 js 文件的绝对路径，所以当你在 `/d1/d2/myscript.js` 文件中写了 `__dirname`， 它的值就是 `/d1/d2` 

#### 模块

##### 引入内置模块

`require('xxx')`

##### 引入第三方模块

Package.json定义了项目名称、版本号、作者，以及项目的外部依赖项，安装第三方库之后依赖项dependencies会加入相关内容，下载后再`require(xxx)`即可使用

##### 实现私有模块

每个模块只能暴露一个变量，而且必须通过 module.exports 设置，该变量通常为一个对象



#### 异步

请求+回调

#### 事件循环

###### ES6作业队列：

ECMAScript 2015 引入了作业队列的概念，Promise 使用了该队列，这种方式会尽快地执行异步函数的结果，而不是放在调用堆栈的末尾。在当前函数**结束之前** resolve 的 Promise 会在**当前函数之后**被**立即**执行

###### `process.nextTick()`

每当事件循环进行一次完整的行程时，将其称为一个**滴答**。当将一个函数传给 `process.nextTick()` 时，则指示引擎在**当前操作结束**（在下一个事件循环滴答开始之前）时调用此函数

http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html



#### http模块





### Express

https://juejin.cn/post/6844903495842136072

##### 中间件

一个个小的处理程序，处理不同的任务

**静态文件服务中间件**应该有以下几个功能：

1. 检查目录中是否存在该文件
2. 如果文件存在则调用 *res.sendFile* 结束响应处理。
3. 如果文件不存在则继续调用下一个中间件从代码角度来说就是调用 *next* 。

Express 内置的 *express.static* 模块作为静态文件中间件，返回值是一个中间件函数

##### HTTP方法-CURD

create-post. read-get, update-put, delete-delete   (仅参考)





##### 路由



### Typescript

https://juejin.cn/post/6844904182843965453

class的setter函数似乎不用标返回值

##### 泛型相关

https://juejin.cn/post/6844904184894980104

##### 修饰器

​	es6的修饰器：https://www.cnblogs.com/goloving/p/8001530.html

### SSR服务端渲染

https://juejin.cn/post/6844904017487724557



### Lodash

lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。lodash的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。类似immutable.js的理念去处理。

https://www.lodashjs.com/ 





### Lighthouse

https://juejin.cn/post/6950855971379871757

FCP:从页面开始加载到页面内容的任何部分呈现在屏幕上的时间

待办: ts,express,imvc,刷题,py,airtest



### 小抄文档

https://devhints.io/



### UI自动化测试

https://segmentfault.com/a/1190000023474856



### scss

Scss 使用``关键字在 CSS 规则中引用**父级选择器**

`&`必须出现在复合选择器开头的位置，后面再连接自定义的后缀

https://uinika.gitee.io/Web/Scss/#extend-extend



### 发布流程

用sourcetree进行commit和提交

build前提交一次，build后提交一次

在gitlab相应的CI/CD的Pipelines可以看到进度

生成build过的镜像后，发布到ares的captain

**在终端发布：**

Ibu-tour:

push之后若要提测，需运行`npm run release:tour`

### 零碎知识

#### react的classNames库

用于在react中动态引入className

https://blog.csdn.net/duola8789/article/details/71514450

#### Array.forEach

`forEach()` 按升序为数组中含有效值的每一项执行一次 `callback` 函数，forEach被调用时，不会改变原数组，callback每次返回undefined

js 对象解构 默认值 重命名

https://blog.csdn.net/Dailoge/article/details/84960945



代码没改完时要切分支，用git stash(先pull)，切回来继续改，就git stash pop



### 实战学习

#### 问题

getSongDetailAction为什么用async?

#### 结构

网络请求放service，工具类放utils，局部组件放components，页面放pages

#### 音乐播放功能(重点)

播放逻辑：列表循环、随机、单曲，当单曲循环时，切换音乐会按照循环来进行

用state变量isPlaying来控制滑块区域，当isPlaying=true时，拖动滑块不会触发函数timeUpdate

音量调节按钮：

​	自增功能：点击页面其他部分，关闭音量条。用到了react中的阻止冒泡和在document绑定监听事件，在react中e.stopPropagation()失效，因为所有事件都托管在document上。具体方法详见https://www.cnblogs.com/lihuanqing/p/6295685.html

用到`<audio>`标签

当前歌曲index, 播放列表内容等东西会存入localstorage

setIsPlaying时加随机值

https://juejin.cn/post/6894914653479960583#heading-4

歌词一句句的切换：用正则匹配得到表示每句歌词的时间（exec得到一个数组）,然后计算得到每句歌词所处的时间（ms），编写函数进行匹配（修改了源代码计算小数点后时间的逻辑）

播放列表

弹出用到CSSTransition

修改了删除歌曲的逻辑：若删除的不为当前正在播放的歌曲，则仅更新列表，不重新随机播放歌曲

歌词滚动上移

用到scrollTop属性，详见代码注释

播放列表拖拽排序

用到sortablejs

##### Normalize.css

normalize与CSS Reset的区别： Normalize.css只是一个很小的css文件，但它在磨人的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset,Normalize.css是一种现代的、为HTML5准备的优质替代方案。总之，Normalize.css是一种CSS reset的替代方案。

Css reset: https://www.jianshu.com/p/69ba47248774



##### 精灵图/雪碧图

CSS Sprites通常被称为css精灵图， 在国内也被意译为css图片整合和css贴图定位，也有人称他为雪碧图。 就是将导航的背景图，按钮的背景图等有规则的合并成一张背景图，即**多张图**合并为一张**整图**， 然后再利用**background-position**进行**背景图定位**的一种技术

https://zhuanlan.zhihu.com/p/62632939

https://blog.csdn.net/Makenzie/article/details/77881957



##### CRACO

**C**reate **R**eact **A**pp **C**onfiguration **O**verride is an easy and comprehensible configuration layer for create-react-app.

<u>Get all the benefits of create-react-app **and** customization(自定义) without using 'eject'</u> by adding a single `craco.config.js` file at the root of your application and customize your eslint, babel, postcss configurations and many more.

##### `react-router-config`

集中式配置路由映射，将路由及其对应组件信息写入js文件中，通常命名为router.js，将对象导出为routes，在在父组件文件中引入routes，引入react-router-config的renderRoutes函数，在相应位置运行renderRoutes(routes)，该函数会进行相应的路由注册。

`renderRoutes(routes)`会将routes传给子组件的`props`属性中，在子组件的`props`中作为`route`属性的内容存在。解构赋值`const {route} = props`可以得到。

如果有嵌套路由，则在router.js文件中的相应路由信息对象中会存在一个routes属性，里面包含二级路由，在渲染嵌套路由时，解构赋值`const {route} = props`，再用`renderRoutes(route.routes)`即可

##### `styled-components`

是一个`React`的第三方库，是`CSS in JS`的优秀实践

https://segmentfault.com/a/1190000017060439



##### React.memo(function xxx(){})

如果组件在**相同 props** 的情况下渲染**相同的结果**，那么你可以通过将其包装在 `React.memo` 中调用，以此通过**记忆组件渲染结果**的方式来**提高**组件的**性能**表现。这意味着在这种情况下，React 将跳过渲染组件的操作并**直接复用最近一次**渲染的结果。

`React.memo` 仅检查 props 变更。

https://zh-hans.reactjs.org/docs/react-api.html#reactmemo

https://segmentfault.com/a/1190000025138329

##### JS

**`Array.protptype.findIndex(callback)`**

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

该方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1

针对数组中的每个元素, 都会执行`callback`回调函数, 执行时会自动传入下面三个参数:`element,index,array`

**`String.prototype.replace(regexp|substr, newSubStr|function)`**

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace

返回一个由替换值（`replacement`）替换<u>部分或所有</u>的**模式（`pattern`）匹配项**后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。

如果`pattern`是字符串，则仅替换第一个匹配项。

原字符串不会改变

**`RegExp.prototype.exec()`**

在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 `null`。如果匹配成功，`exec()` 方法返回一个数组，并更新<u>正则表达式对象</u>的 `lastIndex`属性

```
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

| 对象             | 属性/索引                                 | 描述                                          | 例子                    |
| ---------------- | ----------------------------------------- | --------------------------------------------- | ----------------------- |
| `result`         | `[0]`                                     | 匹配的全部字符串                              | `Quick Brown Fox Jumps` |
| `[1], ...[*n* ]` | 括号中的分组捕获                          | `[1] = Brown[2] = Jumps`                      |                         |
| `index`          | 匹配到的字符位于原始字符串的基于0的索引值 | `4`                                           |                         |
| `input`          | 原始字符串                                | `The Quick Brown Fox Jumps Over The Lazy Dog` |                         |



**`Object.entries(obj)`**

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

##### CSS

:last-of-type 选择器匹配属于其父元素的特定类型的最后一个子元素的每个元素

::before和::after匹配一个虚拟元素，主要被用于为当前元素增加装饰性内容的。他显示的内容是其自身的“`content`”属性，默认是内联元素。

**transision**:在更改CSS属性时控制动画速度的方法，可以让属性变化成为一个持续一段时间的过程，而不是立即生效的。

CSS transitions 可以决定哪些属性发生动画效果 (明确地列出这些属性(`property`))，何时开始 (设置 `delay`），持续多久 (设置 `duration`) 以及如何动画 (定义*timing function*，比如匀速地或先快后慢)。

简写：transition: <property> <duration> <timing-function> <delay>;

**react-transition-group**

https://juejin.cn/post/6844903869894524942

CSSTransition

https://segmentfault.com/a/1190000018113894

##### axios

创建实例：`axios.create(config)` //config是一个表示请求信息的对象

手写axios：https://juejin.cn/post/6856706569263677447#heading-0

**拦截器**



在哪里设置axios的请求方式？

redux中的compose是干嘛的



##### `useCallback`和`useMemo`

[]中的值更新时，返回更新后的函数/值



#### `useDispatch`和`useSelector`

**`useSelector`**: 

共享状态,从Redux的store中提取数据，函数返回一个对象, 在对象中定义需要依赖的state

`const num=useSelector(state=>state.num)`

**两个组件中都依赖**并使用了`redux中的state`，一个组件改变了`state`另一个组件会被重新渲染

- `useSelector`优化: `useSelector`的第二个参数传递一个`ShallowEqual`
- `ShallowEqual`作用: 对一次浅层比较, 和前一次`useSelector`返回的对象及进行比较



**`useDispatch`**: 

共享状态，返回Redux的store中对dispatch的引用，可执行redux中的方法

**在react-redux中使用useSelector、useDispatch替代connect**

https://blog.csdn.net/vitaviva/article/details/104508139



##### `useReducer`

`useState` 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法  (来自官网)

```
//定义reducer
function reducer(state, action) {
...
}

//使用
const [state, dispatch] = useReducer(reducer, initialState)
```

与`useState`相比，`useReducer`很好地分离了逻辑和UI

但`useReducer`是无法像redux一样进行跨组件的状态共享

##### React.lazy()

react原生实现懒加载的效果（在router.js中用到）

https://www.zoo.team/article/react-lazy-suspense

#### Redux

https://juejin.cn/post/6880011662926364679#heading-0

##### reducer

reducer为一个函数，接收`(preState,action)`作为参数，会根据`action`中的`type`不同来对`preState`中的内容进行操作，并返回一个新的state，reducer放在单独的js文件中

##### action

一般action为对象，有type属性和表示data的属性。data属性是后续reducer的操作需要用到的属性。

异步action是一个函数，其返回值也是一个函数，该返回值函数以dispatch为参数（dispatch也是函数），`dispatch()`的参数为一个action，action的创建一般统一放在一个js文件中，不同的action分别`export`

##### store

store的创建放单独的js中，引入reducer，调用`createStore()`

**getState()**函数返回当前state树，在异步action的返回函数中可以作为第二个参数？

用**Provider**来将store传入全局，在需要用到action的地方调用`store.dispatch(相应aciton)`

##### 零碎知识

在react节点中传入的函数形式为回调形式，不能在函数名后加()，否则会立即执行，传参的话用`{...=>func(params)}`

**a标签**

**_blank**

浏览器总在一个新打开、未命名的窗口中载入目标文档。

超链接 target="_blank" 要增加 rel="nofollow noopener noreferrer" 来堵住钓鱼安全漏洞。如果你在链接上使用 target="_blank"属性，并且不加上rel="noopener"属性，那么你就让用户暴露在一个非常简单的钓鱼攻击之下

**`<dl><dt><dd>`**







**待做**

ctrl+k唤醒下拉框、拖拽排序

**疑问**

Text-intent: -9999是干嘛的

歌单页面，选择分类之后，之前弹出来的选项卡是如何消失的？
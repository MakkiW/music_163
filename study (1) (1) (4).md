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



### css层叠上下文

https://juejin.cn/post/6844903667175260174#heading-4

**如何产生层叠上下文**

1. `HTML`中的根元素`<html></html>`本身j就具有层叠上下文，称为“根层叠上下文”。
2. 普通元素设置`position`属性为**非**`static`值并设置`z-index`属性为具体数值（auto不算具体数值），产生层叠上下文。
3. CSS3中的新属性也可以产生层叠上下文

**层叠等级**

层叠上下文的bg/border < `z-index<0` < block < float < inline-block/inline < `z-index:auto/0` < `z-index>0`

1、首先先看要比较的两个元素是否处于同一个层叠上下文中：    1.1如果是，谁的层叠等级大，谁在上面（怎么判断层叠等级大小呢？——看“层叠顺序”图）。    1.2如果两个元素不在统一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。 2、当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。



https://juejin.cn/post/6844903857135304718#heading-0

### 函数式编程

- 不可变性(Immutability)

- 纯函数(Pure Functions)

- 数据转换(Data Transformations)

- 高阶函数 (Higher-Order Functions)

  ​	将函数作为参数或返回函数（Array.map，Array.filter和Array.reduce等）

- 递归

- 组合

### 什么是React

遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。它使用虚拟DOM来有效地操作DOM。它遵循从高阶组件到低阶组件的单向数据流

##### 单向数据流：

React是单向数据流，数据主要从父节点传递到子节点（通过props）。如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。

### Virtual DOM

https://juejin.cn/post/6844903806132568072#heading-0

虚拟DOM只不过是真实 DOM 的 **javascript对象**表示

createElement方法也是vue和react用来创建虚拟DOM的方法，接收三个参数，分别是**type**，**props**和**children**

- 参数分析
  - type: 指定元素的标签类型，如'li', 'div', 'a'等
  - props: 表示指定元素身上的属性，如class, style, 自定义属性等
  - children: 表示指定元素是否有子节点，参数以数组的形式传入

#### diff

DOM-diff的意义：给定任意两棵树，采用**先序深度优先遍历**的算法找到最少的转换步



##### 	比较规则

- 新的DOM节点不存在{type: 'REMOVE', index}

- 文本的变化{type: 'TEXT', text: 1}

- 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTR', attr: {class: 'list-group'}}（若有子节点，则递归遍历比较）

  ​		对比属性的方法：用key，先遍历老节点属性，对比新节点；再遍历新节点属性，添加老节点没有的

- 节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode}

#### patch

doPatch打补丁方法会根据传递的patches进行遍历

- 判断补丁的类型来进行不同的操作

  1. 属性ATTR for in去遍历attrs对象，当前的key值如果存在，就直接设置属性setAttr； 如果不存在对应的key值那就直接删除这个key键的属性

  2. 文字TEXT 直接将补丁的text赋值给node节点的textContent即可

  3. 替换REPLACE 新节点替换老节点，需要先判断新节点是不是Element的实例，是的话调用render方法渲染新节点；

     不是的话就表明新节点是个文本节点，直接创建一个文本节点就OK了。

     之后再通过调用父级parentNode的replaceChild方法替换为新的节点

  4. 删除REMOVE 直接调用父级的removeChild方法删除该节点

#### JSX

JSX是javascript的语法扩展。它就像一个拥有javascript全部功能的模板语言。它生成React元素，这些元素将在DOM中呈现。

### 组件

函数组件（纯函数、无状态）、类组件（有状态）

受控组件

​	*受控组件是在 React 中处理输入表单的一种技术。表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。这称为受控组件。*

非受控组件

​	*可以通过使用`Ref`来处理表单数据。在非受控组件中，`Ref`用于直接从`DOM`访问表单值，而不是事件处理程序。*

容器组件

​	*容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html。*

高阶组件

​	*高阶组件是将组件作为参数并生成另一个组件的组件。 Redux `connect`是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。*

### 错误边界

错误边界是一种 React **组件**，这种组件**可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI**，而并不会渲染那些发生崩溃的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

如果一个 class 组件中定义了 [`static getDerivedStateFromError()`](https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromerror) 或 [`componentDidCatch()`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidcatch) 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息

### Redux-thunk

我们使用`redux-thunk`在React中调用API。因为**`reduce`是纯函数，所以没有副作用，比如调用API**。因此，我们必须使用`redux-thunk`从 action creators 那里进行 API 调用。Action creator 派发一个action，将来自API的数据放入action 的 `data` 中。Reducers 接收我们在上面的`redux`循环中讨论的数据，其余的过程也是相同的



### Redux

**核心理念**:

- **单一数据源**: 整个应用只有唯一的状态树，也就是所有 state 最终维护在一个根级 Store 中；

- 状态只读

  : 为了保证状态的可控性，最好的方式就是监控状态的变化。那这里就两个必要条件：

  - Redux Store 中的数据无法被直接修改；
  - 严格控制修改的执行；

- **纯函数**: 规定只能通过一个纯函数 (Reducer) 来描述修改；



### React Hooks

#### useEffect(()=>{},[source])

当source有内容时，只有source` 改变后才会重新创建订阅

类定义中有许多生命周期函数，而在 React Hooks 中也提供了一个相应的函数 (`useEffect`)，这里可以看做`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的结合。

通过第二个参数，我们便可模拟出几个常用的生命周期:

- `componentDidMount`: 传入`[]`时，就只会在初始化时调用一次；

```
const useMount = (fn) => useEffect(fn, [])
复制代码
```

- `componentWillUnmount`: 传入`[]`，回调中的返回的函数也只会被最终执行一次；

```
const useUnmount = (fn) => useEffect(() => fn, [])
```

- `componentDidUpdate`: `useEffect`每次均会执行

```
const mounted = useMounted() 
useEffect(() => {
    mounted && fn()
})
```

#### useCallback和useMemo

避免不必要的重新渲染

### Immutable

https://zhuanlan.zhihu.com/p/20295971

返回新数据，未改变的数据进行结构共享

##### immutablejs在项目中配合redux使用

https://juejin.cn/post/6844904068196876296

因为state是无法直接更改的，因此往往需要对对象做深层拷贝并返回新对象的形式，有时候会增加性能损耗，这时候可以使用immutable来使数据不可被更改

reducer定义defaultState时用Map({xx:xx, xxx:xxx,...})

*当时用immutable.js 时，使用 {formJS} ,使 JS对象 转化为 immutable对象，fromJS和toJS会深度转换数据，随之带来的开销较大，尽可能避免使用，单层数据转换使用Map()和List()*

**合并多个reducers:** 

`combineReducers({reducerName1: reducer1,reducerName2: reducer2})`

*此时由于原本的redux合并的combineReducers只支持原生可改变的state值，所以还需要借助redux-immutable来从state取出一个immutable 对象*

**要使用store中的state时:** 

*由于使用了新的redux-immutable来从reducer中取得了一个immutable对象，所以在组件中也不能用原生js点操作符来取数据了*

`const {xxx} = useSelector( state => ({xxx: state.getIn([reducerName: stateName]) }), shallowEqual)`



### Fiber

任务分割

**react核心流程：**

reconciliation (**调度算法**，也可称为 render):

- 更新 state 与 props；
- 调用生命周期钩子；
- 生成 virtual dom；
  - 这里应该称为 Fiber Tree 更为符合；
- 通过新旧 vdom 进行 diff 算法，获取 vdom change；
- 确定是否需要重新渲染

commit:

- 如需要，则操作 dom 节点更新；

Fiber 其实可以算是一种编程思想，在其它语言中也有许多应用(Ruby Fiber)。核心思想是 **任务拆分和协同**，主动把执行权交给主线程，使主线程有时间空挡处理其他高优先级任务。

当遇到进程阻塞的问题时，**任务分割**、**异步调用** 和 **缓存策略** 是三个显著的解决思路



### 生命周期

- 使用`getDerivedStateFromProps` 替换 `componentWillMount` 与 `componentWillReceiveProps`；
- 使用`getSnapshotBeforeUpdate`替换`componentWillUpdate`；
- 避免使用`componentWillReceiveProps`；

其实该变动的原因，正是由于上述提到的 Fiber。

### setState

在 **合成事件** 和 **生命周期钩子(除 componentDidUpdate)** 中，`setState`是"异步"的；

- 原因: 因为在`setState`的实现中，有一个判断: 当更新策略正在**事务流**的执行中时，该组件更新会被推入`dirtyComponents`队列中等待执行；否则，开始执行`batchedUpdates`队列更新；
  - 在**生命周期钩子**调用中，更新策略都处于更新之前，组件仍处于事务流中，而`componentDidUpdate`是在更新之后，此时组件已经不在事务流中了，因此则会同步执行；
  - 在**合成**事件中，React 是基于 **事务流完成的事件委托机制** 实现，也是处于事务流中；
- **问题**: 无法在`setState`后马上从`this.state`上获取更新后的值。
- **解决**: 如果需要马上同步去获取新值，`setState`其实是可以传入第二个参数的。`setState(updater, callback)`，在回调中即可获取最新值；
- **批量更新**: 在 **合成事件** 和 **生命周期钩子** 中，`setState`更新队列时，存储的是 **合并状态**(`Object.assign`)。因此前面设置的 key 值会被后面所**覆盖**，最终只会执行一次更新

在 **原生事件** 和 **setTimeout** 中，`setState`是同步的，可以马上获取更新后的值；

- 原因: 原生事件是浏览器本身的实现，与事务流无关，自然是同步；而`setTimeout`是放置于定时器线程中延后执行，此时事务流已结束，因此也是同步；

### HOC

- 高阶组件不是组件，是 **增强函数**，可以输入一个元组件，返回出一个新的增强组件；
- 高阶组件的主要作用是 **代码复用**，**操作** 状态和参数

js:

https://juejin.cn/post/6844904004007247880#heading-33

React:

https://juejin.cn/post/6844903801153945608



数组去重： https://juejin.cn/post/6844903602197102605#heading-6



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



#### `useDispatch`和`useSelector`

**`useSelector`**: 

共享状态,从Redux的store中提取数据，函数返回一个对象, 在对象中定义需要依赖的state

`const num=useSelector(state=>state.num)`

**两个组件中都依赖**并使用了`redux中的state`一个组件改变了`state`另一个组件会被重新渲染

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
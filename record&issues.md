## 隐式类型转换

 ![img](https://s2.loli.net/2024/08/12/rAaoOWqxjcwGPi3.png)

先对运算符左边转换，再对右边转换

一般都是两边转换成相同的类型进行计算

对于 + ，在转换过程中，如果一方出现字符串，立刻进行字符串拼接；未出现字符串则转换成相同的类型计算。

```js
[] + true// 'true'
true + true// 2
```

let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false; 



## bind call aplay区别是什么

bind返回一个新的函数，call aplay立即执行，call接受的是参数列表，而apply接受的是一个数组或类数组对象。

## 如何将数组转成多个参数传入

以Math.max为例，要求传入多个参数

```js
Math.max([value1[,value2, ...]])
```

如果参数都在一个数组中，可以直接传入的方法：

1.eval

```js
var arr = [6, 4, 1, 8, 2, 11, 23];

var max = eval("Math.max(" + arr + ")");
console.log(max)
```

2.apply

```js
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max.apply(null, arr))
```

3.扩展运算符

```js
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr))
```

## arr.reduce的使用

```js
arr.reduce((previousValue, item, index, arr) => {
 
}, initialValue)
```

### 使用场景

当需要遍历一个数组求出一个结果时，如求和、求最大值等。

### 参数

- previousValue：第一次执行回调函数，如果initialValue有值，使用initialValue的值；如果没有值，使用数组第一个元素的值。第二次执行回调，值为上一次执行返回的结果。

- item：第一次执行回调函数，如果initialValue有值则取数组第一个值；如果没有值，取数组第二个值。之后每次执行回调都会使用下一个数组元素。

- index：item在数组中的下标
- arr：调用reduce()方法的数组
- initialValue：【可选】初始值（若initialValue有值，则第一次调用回调函数时会传给 previousValue ）
  initialValue有值时，回调函数执行 arr.length 次
  initialValue无值时，回调函数执行 arr.length -1 次
- 返回值是最后一次遍历时返回的结果

若arr为空数组，当initialValue没有值时，会报错TypeError: Reduce of empty array with no initial value，但当initialValue有值时，不会报错。

### 是否需要初始值

取决于最终值的形态是否需要确定，若最终值是对象数组，则需要给pre指定一个初始值，若最终值是和数组元素本身一样，则可以不指定。

## arr.concat的使用

a.concat(b)拷贝了a数组的新数组，拆解b中的所有元素后拷贝到这个新数组中，最后返回新数组，对a本身没有影响。

```js
[1, 2, 3].concat([4 ,5 ,6])// [1, 2, 3, 4, 5, 6]
```

concat可以传多个值，concat会对每个参数行拆解后拼接到新数组中。

```js
[].concat(1, 2, 3, [4, 5], [6, [7, 8]])// [1, 2, 3, 4, 5, 6, [7, 8]]
```

>  [!WARNING] 
> 相比之下，Object.assign无法拷贝非对象参数
>
> ```js
> Object.assign([],[1,2])// [1, 2]
> Object.assign([],3)// []
> ```
> 

如果提供的数据是数组，配合扩展运算符使用可以对数组扁平一层。扩展运算符把数组拆成单个元素，concat对每个元素拆解后拼接到一个数组中。

```js
var arr = [1, [2, [3, 4]]];
[].concat(...arr)// [1, 2, [3, 4]]
```

拷贝数组：

```js
var arr = [].concat([1,2,3]) //[1,2,3]
```

注意：concat是浅拷贝。

### 使用场景

1.数组拷贝、数组中添加元素，返回一个新数组。

2.数组扁平化

递归遍历多维数组拼接成一个一维数组。

```jsx
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

```

或者配合扩展预算符

```js
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

console.log(flatten(arr))
```



## arr.push的使用

push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

```js
var a =[1,2,'a']
var res = a.push(1)
console.log(res)//4
console.log(a)//[1,2,'a',1]
```

> [!NOTE] 
> 使用concat替代push简化代码
>
> 1.添加单个元素
>
> ```jsx
> pre.push(newVal);
> return pre;
> //可以简化为
> return pre.concat(newVal)
> ```
>
> 2.添加多个元素，其实就是看作数组拼接
>
> ```js
> //向bar中添加foo的元素
> var foo = [1, 2, 3];
> var bar = [4, 5, 6];
> // push写法
> foo.forEach((e) => {
> bar.push(e);
> });
> 
> //concat写法
> bar = bar.concat(foo);
> ```



## arr.some的使用

**arr.some()**函数检查数组的至少一个元素是否满足参数函数检查的条件。该函数的语法如下：

```js
arr.some(arg_function(element, index, array), thisArg)
```

**参数**
此函数的参数是另一个函数，该函数定义要检查数组每个元素的条件。该函数本身带有三个参数：

- array
- 这是在其上调用.some()函数的数组。

- index
- 这是函数正在处理的当前元素的索引。

- element
- 这是函数正在处理的当前元素。

此值的另一个自变量用于告诉函数在执行自变量函数时使用此值。

**返回值**
即使数组的元素之一满足参数函数实现的条件(并且不检查剩余值)，该函数也会返回true。如果数组的任何元素均不满足条件，则返回false。

```js
 arr.some((e) => {
 	return Array.isArray(e);
 })
//等价于
arr.find((e) => {
	return Array.isArray(e);
}) != undefined
```



## Set

Set集合中的元素无序不重复，所以可以用set来为数组去重。

```js
function unique(array) {
   return Array.from(new Set(array));
}
```

## 字符串转数字

```js
+'21111'
21111
```

```js
+'21111'
21111
```

## void 0

等同于void(0),返回undefined

```js
void 0 === undefined// true
```

为什么要用void 0 替代undefined
①某些情况下用undefined判断存在风险，因undefined有被修改的可能性，但是void 0返回值一定是undefined

②兼容性上void 0 基本所有的浏览器都支持

③ void 0比undefined字符所占空间少。

## 判断一个值为基本数据类型

```js
let a = 123
typeof a !== 'function' && typeof a !== 'object'// true
```

## 如何让NaN和Nan相等成立

js中`NaN===NaN`结果是false，可以自定义eq函数实现：

```js
function eq(a,b){
  if(a!==a) return b!==b
}
```

## Object.create的使用

`Object.create(null)`可以创建一个没有原型的对象

## Array.form的使用

### 定义

```js
Array.from(arrayLike, mapFn, thisArg)
```

- [`arrayLike`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#arraylike)

  想要转换成数组的类数组或可迭代对象。

- [`mapFn`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#mapfn) 可选

  调用数组每个元素的函数。如果提供，每个将要添加到数组中的值首先会传递给该函数，然后将 `mapFn` 的返回值增加到数组中。使用以下参数调用该函数：[`element`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#element)数组当前正在处理的元素。[`index`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#index)数组当前正在处理的元素的索引。

- [`thisArg`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#thisarg) 可选

  执行 `mapFn` 时用作 `this` 的值。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from#返回值)

一个新的[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)实例。

### 创建一个数组

创建一个类数组后转化为数组，mapFn如果不传数组的所有元素都是undefined，传了mapFn之后把将要添加到数组中的值都传到了函数中，函数返回的都是正在处理的元素索引，返回之后被添加到了数组中。

```js
var arr = Array.from({length: 1000000}, (v, i) => i);
```

## 函数柯里化

用途：降低通用性，提高适用性

```js
// 示意而已
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");
```

## arguments

arguments是类数组，形如`{1:'1221',2:true,length:2}`。内部实现了迭代器，可以被forof遍历，但是不能使用数组中的方法，可以使用以下方式使用

```js
var args = Array.prototype.slice.call(arguments, 1);
// 或者
var args = [].slice.call(arguments, 1);
```

类数组转数组的方法：

```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }

// 1. slice

Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"]

// 2. splice

Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"]

// 3. ES6 Array.from

Array.from(arrayLike); // ["name", "age", "sex"]

// 4. apply

Array.prototype.concat.apply([ ], arrayLike)复制代码

```

## ES6可以使用...args

args是数组

```js
function name(...args) {

  console.log('args :', args);//[ 1, 2, 3 ]

  var a = { nice: 123 };

  console.log('[ arguments ] >', arguments);//[Arguments] { '0': 1, '1': 2, '2': 3 }

  console.log('[ ...arguments ] >', ...arguments);//1 2 3

}

name(1, 2, 3);
```

## ES6展开运算符...

函数调用：

```js
myFunction(...iterableObj);
```

可以展开数组、类数组、字符串等可迭代对象：

```js
[...iterableObj, '4', ...'hello', 6];
```

构造字面量对象时，进行克隆或者属性拷贝（ECMAScript 2018 规范新增特性）：

```js
let objClone = { ...obj };
```

注意：除函数传参外，都需要在展开后使用[]或{}包裹成新对象，不然js会报错。

> [!NOTE] 
> 在react的jsx语法中，我们可以直接使用...拆解对象不需要{}包裹，这得益于react自身的api加持。
> 注意这个功能只能在jsx中使用，在react代码的其他地方也不能使用（react对jsx进行了处理，其他部分其实还是普通js）。
>
> ```jsx
> const p = {test:1,try:"2"}
> <Count {...p}/>//注意这里的{}不是指新的对象，而是jsx中使用js时需要包裹的大括号
> //相当于
> <Count test={1} try="2"/>
> ```

## 惰性函数

#### 函数重写

就是在函数里面，对原函数本函数进行重新赋值，执行一次函数后，以后再调用这个函数时，调用的都是 重新赋值的函数 。

```js
function fn () {
    console.log('我是函数fn')
    fn = function () {
        console.log('我是重写的fn')
    }
}

fn() // => 我是函数fn
fn() // => 我是重写的fn
fn() // => 我是重写的fn
```

## 防抖与节流

### 防抖

用户不断重复操作，等用户停止操作一段时间delay后才执行，只执行最后一次。

#### 问题

防抖可以让用户多次过快点击只执行一次，解决防止重复操作的问题。但是如果最后一次成功执行之后如果用户还是可以点击再执行，就又会产生重复操作的问题，因此还是需要配合按钮上锁。

情景：点击按钮，执行异步操作，完成之后跳转，其中按钮点击使用了防抖只触发delay后的最后一次。

当用户点击后需要先执行一个异步任务再跳转，异步任务等待完成过程中用户可以再次点击，则会再次触发异步操作造成问题。

解决：1.执行最后一次操作之后设置用户不可操作的限制（按钮置灰、加载遮罩、点击不发送请求），异步任务执行成功跳转，不成功放开限制。2.组件卸载前清除定时器。

### 节流

用户重复操作，每隔一段时间执行一次。

## 数据类型转换

### 手动转换成字符串的方法

```
1、toString()方法

toString()方法返回的是相应值的字符串表现

数值、布尔值、对象和字符串值都有toString()方法，但是null和undefined值没有这个方法
```

```
2、String()函数

在不知道变量是否为null或者undefined是可以使用String()函数来转换为字符串类型

String()函数可以将任何类型的数值转换为字符串
```

```
3、利用+“”

把转换的值与一个字符串 “” 加在一起
```

### 隐式类型转换

当运算符两边类型不等时无法运算，js自动转换成一致的数据类型进行比较或计算

转换过程：

![img](https://s2.loli.net/2024/08/12/rAaoOWqxjcwGPi3.png)

[js中的 隐式数据类型转换 - 真的想不出来 - 博客园 (cnblogs.com)](https://www.cnblogs.com/MrZhujl/p/14646846.html)

### if条件判断

#### 假值

```
false、0、""、null、undefined 和 NaN
1
```

#### 真值（上面几个值以外都为truthy）

## js发送ajax请求

### XMLHttpRequest（xhr）

XMLHttpRequest是对ajax技术的实现，可以使用原生XMLHttpRequest发送请求

axios和jquery都是封装了XMLHttpRequest对象

### Fetch

Fetch也是对ajax技术的实现

## 盒子模型

元素内容宽高+元素padding=元素内容（client、scroll）

元素实际占的大小 = 元素偏移量（offset）= 元素内容+滚动条+border

## 类数组对象

形如`{1:'1221',2:true,length:2}`，是可遍历对象，但不是可迭代对象。

length用于遍历中：虽然这里没写key为0的值，但是length为2默认只能遍历0和1的值，所以最后只会打印1221。

类数组对象key为number，可以被for循环、Array.prototype.forEach遍历，但未实现迭代器不能被forof遍历。

类数组对象arguments实现了迭代器，可以被forof遍历。

## line-height

父元素设置后会传递给子元素

默认的line-height是内容的font-size加上默认的上下行距计算出来的



## script标签之type = module

```html
 <script type="module" src="./day02.js"></script>
```

可以在day02.js中使用es6模块导入了，但是默认开启了严格模式

## 严格模式

待补充



## float

浮动之后元素会变成inline-block，大小由内容撑开，但是可以设置宽高

[css —— inline、block、inline-block特性总结_css inline inline-block-CSDN博客](https://blog.csdn.net/huzhenv5/article/details/105068168)

## 子绝父相

absolute绝对定位需要相对于向上寻找的祖先元素中第一个开启了定位的元素

absolute会脱离文档流，relative则不会

## 响应式布局

代码用1920px写

@media划分举例：

适配中大屏：

@media screen and (max-width: 1280px)

@media screen and (min-width: 992px) and (max-width: 1200px)

@media screen and (min-width: 768px) and (max-width: 991px)

767及以下为移动端：

@media screen and (max-width: 767px)

@media screen and (max-width: 414px)

@media screen and (max-width: 375px)

适配分界点划分：

缩小浏览器窗口，如果到1280出现样式混乱，用1280进行划分，1280以下写新的样式，如果适配之后1280以下都没有问题，就设定(max-width: 1280px)

如果1280以下添加样式之后发现还有问题，就找到新的临界点1200，已有的(max-width: 1280px)改为设定(min-width: 1200px) and (max-width: 1280px)。1200以下进行新的适配，设定(max-width: 1200px)

1200以下同理，都没问题就保持写最大值，出现新的临界点，就把这段适配代码划分范围，再处理新的临界点以下的适配。

## 使用margin:auto的契机

父子元素都是块级元素，子元素设置了宽或高。当子元素的虚拟占位（未手动限制宽高之前）的宽或高占满了父元素，设置margin为auto可以使其在横轴或纵轴居中。

垂直居中：

top和bottom导致子元素的虚拟占位占满了父元素的高

```css
#parent{
  position: relative;
}
#son{
    position: absolute;
    margin: auto 0;
    top: 0;
    bottom: 0;
    height: 50px;
}
```

水平居中:

子元素的虚拟占位本来就是占满父元素的，默认width：100%

```css
#parent{

}
#son{
  	width:100px;
    margin: 0 auto;
}
```

## toRef

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')
```

toRef对reactive对象和普通对象这种用法都适用

fooRef使用state的foo属性的值创建ref，并且保存着state对象的引用，可以修改state的foo属性

toRef的实现使用了代理，访问fooRef.value就是访问state.foo,修改fooRef.value就是修改state.foo

## watchEffect

 watchEffect设置flush:'post'后，副作用回调函数依然会在watchEffect创建后立即执行一次，但是是在dom更新后立即执行一次

```js
  watchEffect(()=>{
    console.log(counter.value.textContent)
    console.log(+counter.value.textContent===1)
  },{flush:'post'})
```

watch如果同时写flush:'post'和immediate:true会发生报错

监听器最好不要在函数中使用，重复创建会导致混乱

## vue执行流程

执行js同步代码，（dom更新前操作）更新dom，执行异步代码

## v-model

### 原生组件

```html
<input v-model="searchText" />
//相当于
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

### 自定义组件

父组件

```js
let searchText = ref('Hello World')

<CustomInput v-model="searchText"/>
//相当于
<CustomInput  :model-value="searchText"  @update:model-value="newValue => searchText= newValue" />
```

子组件

```js
//1.子组件原始写法
//内部的原生组件不能直接使用v-model，因为无法触发自定义事件
const props = defineProps(['modelValue','test']);

const emit =defineEmits(['update:modelValue'])
<input
  :value="props.modelValue"
  @input="emit('update:modelValue',$event.target.value)"
/>

//2.vue4.5之后子组件使用defineModel写法
//内部的原生组件可直接使用v-model，defineModel返回值被修改时触发自定义事件
const model = defineModel()

<input v-model="model" />
//相当于  
<input
  :value="model"
  @input="model = $event.target.value"
/>
```

这个返回值model是一个ref对象，其value值取的是props.modelValue，所以input显示的是props.modelValue的值，当input输入时model的value值发生变更，model对象内部自动触发携带了新值的 `update:modelValue` 自定义事件，传入$event.target.value值

## vue的响应式（粗浅整理）

### 响应式数据

指的是和模板中变量的单项绑定的数据，数据改变，dom发生更新。

### 丢失响应式

发生在响应式结构赋值或者属性值赋值给一个新的变量时

```js
const bar = reactive({foo:123})
let {foo} = bar
```

foo不再是响应式数据，且丢失了与bar.foo的响应式连接

解决方法

```js
 const bar = reactive({foo:123})
 let {foo} = toRefs(bar)
```

## 什么是副作用函数

~~一个函数引用了外部的资源，这个函数会受到外部资源改变的影响，我们就说这个函数存在副作用。因此，把该函数称作副作用函数~~（存疑）

函数本来是只进行计算的，但是却还对外部产生了影响，对外部产生影响的行为成为副作用，有这种影响的函数被称为副作用函数

常见的副作用：

1、修改了一个变量2、直接修改数据结构3、设置一个对象的成员4、抛出一个异常或以一个错误终止5、打印到终端或读取用户输入6、读取或写入一个文件7、在屏幕上画图8、操作dom

纯函数：

1.对于相同的输入（输入指的是函数的入参），这个函数总是有相同的输出

2.在执行过程中没有语义上可观察的副作用

```js
let a =1,b=2;
function fn(){
	return a+b
}
```

fn是非纯函数，但不是副作用函数，属于引用不透明（函数内部引用外部变量，导致影响函数返回值）的函数

![image-20241006153822336](/Users/dnhy/Library/Application Support/typora-user-images/image-20241006153822336.png)

参考：

https://www.jianshu.com/p/5d88a569f6c1

## 构造和继承的区别

对象的第一层原型对象属于的函数是构造函数，之后几层原型对象属于的构造函数都是继承。

只要子类中带有父类的属性都是继承：包括父类的原型对象和实例属性

如果子类原型节点可以查找到父类的原型对象，则子类是父类的实例（instanceof原型链查找逻辑）

![image-20241010081324413](/Users/dnhy/Library/Application Support/typora-user-images/image-20241010081324413.png)

## 对象的getter、setter函数和class的getter、setter函数的区别

对象的getter、setter函数添加在实例本身上，优先级高于同名自定义属性,Object.defineProperty同理

![image-20241010121048487](/Users/dnhy/Library/Application Support/typora-user-images/image-20241010121048487.png)

class的getter、setter函数添加在原型对象上，优先级弱于同名自定义属性

![image-20241010121142058](/Users/dnhy/Library/Application Support/typora-user-images/image-20241010121142058.png)

可以选择对已有的属性进行劫持，比如_value属性，通过get value和set value劫持



## Webpack相关

### TreeShaking优化

webpack一般对模块中引入的代码都会进行打包，不管有没有用到

TreeShaking优化可以只打包引入的模块中用的到的和执行了的代码,只适用于es module,且局部引入的情况，全部引入不适用

如果必须要全部引入，我们还可以进行按需引入进行优化，比如corejs的按需引入

webpack自带，无需配置

### wenpack热加载

对于csswebpack自动进行了这样的处理

js需要手动处理，但对于 vue-loader,react-hot-loader不需要手动处理js

```js
if (module.hot) {
	module.hot.accept('./show.js');
}
```



## 疑问，对this解构赋值获取data数据后，修改获取的数据报错

```js
      const { fistName, secondName } = this
      fistName=234
      console.log('fistName :', fistName)
```

![image-20241012185702280](/Users/dnhy/Library/Application Support/typora-user-images/image-20241012185702280.png)

## 算法

1.通过策略跳过某些不需要的情况

双指针

2.模拟

3.换一种计算策略

前缀和

## inclues,indexOf

js数组和字符串判断是否存在某个元素都可以用inclues,indexOf，但不存在contains。`indexOf` 和 `includes` 使用严格相等 `===` 进行比较

注意：**方法 `includes` 可以正确的处理 `NaN`**

方法 `includes` 的一个次要但值得注意的特性是，它可以正确处理 `NaN`，这与 `indexOf` 不同：

```javascript
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1（错，应该为 0）
alert( arr.includes(NaN) );// true（正确）
```

这是因为 `includes` 是在比较晚的时候才被添加到 JavaScript 中的，并且在内部使用了更新了的比较算法。

## ind、findIndex

如果是按照某个条件搜索否符合条件的元素，可以使用find、findIndex

## 截取操作

数组使用slice截取数组，返回截取结果，不改变原数组

数组使用splice删除数组元素，返回被删除的元素数组，改变原数组

字符串使用subStr截取数组，返回截取结果，不改变原字符串

字符串也可以使用[]获取单个字符，str[0]相当于chatAt(0)，返回截取结果，对str[0]结果赋值无效

## 异步任务

1.执行setTimeout()本身就是执行一个异步任务，可以看作是接口开始发送请求，

其中的时间是这个异步任务执行的时间，可以看作是接口请求时间，

其中的回调函数就是异步任务执行的结果回调，可以看作是接口返回值。

2.new Promise对象时传入的回调函数是同步任务,then函数中的回调是一个异步执行的任务。

Promise可以包裹一个异步任务（任务的执行还是自己执行的，只不过把调用包裹其中），通过调用resolve的方式确保包裹其中的异步任务执行完后再执行then中的异步任务（在异步队列中给异步任务排序）。

对多个由Promise包裹的异步任务进行统筹：使用Promise.all和Promise.race整合这些promise对象，按照规则排序这些打包的异步任务和其他的异步任务

## ts

```typescript
// 带泛型参数的函数
function identity<T>(arg: T): T {
  return arg;
}

const obj = new (identity as any)("qwqw");

identity<string>("1111");
```

jsconfig.json**提供更好的编辑器支持**以及别名解析，tsconfig.json除此以外还会为编译ts文件为js文件添加规则配置



declare接口、命名空间是对象，class是类，module是模块，type是变量，function是函数



### 如何查找.d.ts

![image-20241027190435534](/Users/dnhy/Library/Application Support/typora-user-images/image-20241027190435534.png)

![image-20241027191730890](/Users/dnhy/Library/Application Support/typora-user-images/image-20241027191730890.png)

![image-20241027191820684](/Users/dnhy/Library/Application Support/typora-user-images/image-20241027191820684.png)

### 索引签名类型
绝大多数情况下，我们都可以在使用对象前就确定对象的结构，并为对象添加准确的类型。

使用场景：当无法确定对象中有哪些属性（或者说对象中可以出现任意多个属性），此时，就用到索引签名类型了。

- 对象

```ts
interface AnyObj {
	[key: string]: number
}

let obj: AnyObj = {
  a: 1,
  b: 2,
  c: 3
```

1. 使用 [key: string] 来约束该接口中允许出现的属性名称。表示只要是 string 类型的属性名称，都可以出现在对象中。
2. 这样，对象 obj 中就可以出现任意多个属性（比如，a、b 等）。
3. key 只是一个占位符，可以换成任意合法的变量名称。
4. 隐藏的前置知识：JS 中对象（{}）的键是 string 类型的。

- 数组
  在 JS 中数组是一类特殊的对象，特殊在数组的键（索引）是数值类型。
  并且，数组也可以出现任意多个元素。所以，在数组对应的泛型接口中，也用到了索引签名类型。

```ts
interface MyArray<T> {
	[n: number]: T
}

let arr: MyArray<number> = [1, 2, 3]
```

1. MyArray 接口模拟原生的数组接口，并使用 [n: number] 来作为索引签名类型。
2. 该索引签名类型表示：只要是 number 类型的键（索引）都可以出现在数组中，或者说数组中可以有任意多个元素。
3. 同时也符合数组索引是 number 类型这一前提。

## issues

1、 Fetch会根据body自动设置Content-type,axios是否也会呢？

https://zh.javascript.info/fetch	

##  引入原生类型规范事件名称

这种方式可以在编译时捕获错误，避免了在运行时出现无效的事件名称。同时，它还提供了代码补全和类型检查的支持，使开发过程更加安全和高效。

```ts
const event: keyof WindowEventMap = "load";
```

```ts
// 引用WindowEventMap中的dom事件名称
type WindowEventName = keyof WindowEventMap;

// 使用WindowEventName来声明事件处理函数
function handleEvent(event: WindowEventName) {
  // 处理事件逻辑
}

// 示例用法
handleEvent('click'); // 安全引用click事件
handleEvent('scroll'); // 安全引用scroll事件
handleEvent('foo'); // 编译错误，foo不是有效的Window事件
```

## 逻辑运算符**&&**和**||**

**短路现象**‌：

- ‌**&&**‌：如果第一个操作数为假，则不需要计算第二个操作数，因为结果已经确定为假。
- ‌**||**‌：如果第一个操作数为真，则不需要计算第二个操作数，因为结果已经确定为真。‌

如果第一个操作数未确定结果，看第二个操作数

运算之后总是返回最后一个计算的操作数

```
21211212121&&null//null

21211212121&&true//true
```

## node环境下无法使用ESModule

使用babel-node代替node

7.x版本之前需要加参数：

https://blog.csdn.net/weixin_43094085/article/details/114832738

7.x版本之后不需要加参数：

https://juejin.cn/post/6844903829008285710

如果要使用nodemon:

`nodemon --exec babel-node 'js-info/object.js'`

## babel编译代码

Babel是一个JavaScript编译器，可以将ES6代码转换为ES5代码，使得现有的浏览器可以运行ES6特性。以下是使用Babel编译ES6的基本步骤：

1. 安装Babel CLI和preset环境：

```bash
npm install --global @babel/cli @babel/preset-env
```

2. 创建Babel配置文件（如果尚未存在）：

```bash
mkdir ~/.babelrc
```

3. 编辑或创建`.babelrc`文件，并添加以下内容：

```json
{
  "presets": ["@babel/preset-env"]
}
```

4. 编写你的ES6代码，例如在`example.js`文件中：

```javascript
// example.js
const sum = (a, b) => a + b;
console.log(sum(1, 2));
```

5. 使用Babel编译你的代码：

```bash
babel example.js --out-file compiled.js
```

编译后的代码会输出到`compiled.js`文件，Babel会将ES6特性转换为ES5兼容的代码。

或者使用`babel src -d dist`输出到目录

## 数组模拟

- 数组模拟栈

使用push，pop在数组尾部压入弹出元素

- 数组模拟队列

使用push，shift在队尾添加元素，在队头取出元素

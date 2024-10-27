## 函数式编程

- 函数是”第一等公民”。所谓”第一等公民”（first class），指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。

- 只用”表达式"，不用"语句"。

- 没有”副作用"。如果函数与外部可变状态进行交互，则它是有副作用的。如:

  - 修改一个变量
  - 直接修改数据结构
  - 设置一个对象的成员
  - 抛出一个异常或以一个错误终止
  - 打印到终端或读取用户的输入
  - 读取或写入一个文件
  - 在屏幕上绘画

- 不修改状态。在函数式编程中变量仅仅代表某个表达式。这里所说的’变量’是不能被修改的。所有的变量只能被赋一次初值。

- 引用透明（函数运行只靠参数）

## 函数柯里化

优点：事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的“缓存”，是一种非常高效的编写函数的方法。  

## 函数组合

接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出。

```js
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}

var first = arr => arr[0];
var reverse = arr => arr.reverse();
var last = compose(first, reverse);
console.log(last([1,2,3,4,5]))   // 5
```

## pointfree 模式

概念：Pointfree这个概念，在编程中叫做隐式编程，同时也叫做无点编程(point-free)，其概念是函数定义不用标示所需要操作的参数(点)的一种编程范式。**Pointfree：不使用所要处理的值，只合成运算过程。**

前提：需要在纯函数之间使用，至少说“建议”是纯函数，如果你可以把副作用控制的足够好的话也是可以的。

解决的问题：内存开辟，减少不必要的命名

实现方式

- [Ramda](https://github.com/ramda/ramda) 非常实用的javascript函数库
- [lodash-fp](https://github.com/lodash-archive/lodash-fp) 柯里化的lodash库

[聊一聊函数式编程中的pointfree - 掘金 (juejin.cn)](https://juejin.cn/post/6910005110663806984)
[Pointfree 编程风格指南 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2017/03/pointfree.html)
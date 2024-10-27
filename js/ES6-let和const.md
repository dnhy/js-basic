## let和var的区别

**var会进行变量提升**：定义时把变量声明提到作用域顶部（初始化不会提升），可以在定义前调用。let和const不会变量提升

```js
if (false) {
    var value = 1;
}
console.log(value); // undefined
```

```js
if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined
```

js运行时先扫描变量声明，遇到var变量提到作用域顶部，遇到let和const声明时会把变量放到TDZ（临时死区），访问TDZ中的变量会报错。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

访问顺序为先找当前作用域中声明的变量（包含放到顶部的和TDZ中的），找不到再找外面的

```js
var value = "global";

// 例子1
(function() {
    console.log(value);

    let value = 'local';
}());

// 例子2
{
    console.log(value);

    const value = 'local';
};
```

两个作用域中申明value时都放到了TDZ，访问时在当前块级作用域中找，顶部没找到再在TDZ中找，找到了value（声明完成前进行了访问，变量还在TDZ中），于是访问TDZ中的变量，所以都会报错，报错之后阻断了也不会再往上找。

**let和const不能重复声明，var可以**。

重复声明一定是在同一作用域中才可能发生。

```js
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```

**let和const不绑定全局作用域**

当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。

```js
var value = 1;
console.log(window.value); // 1
```

然而 let 和 const 不会：

```js
let value = 1;
console.log(window.value); // undefined
```

## 循环中的 let  const  var

for 循环底层对let和var的处理是不同的，对let和const进行了特殊的处理。

### let

1.在 `for (let i = 0; i < 3; i++)` 中，即圆括号之内建立一个隐藏的词法作用域，**每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化**

```js
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```

就相当于：

```js
// 伪代码
(let i = 0) {
    funcs[0] = function() {
        console.log(i)
    };
}

(let i; i = 0; i++) {
    funcs[1] = function() {
        console.log(i)
    };
}

(let i; i = 1; i++) {
    funcs[2] = function() {
        console.log(i)
    };
};
```

2.如果大括号中使用let，小括号不会变成词法作用域。而是把内部的同名变量编译成新的变量，如i编译成_i,防止重复定义报错（只在循环中小括号和中括号之间这么做，不在循环中直接报错）。

```js
for (var i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

猜测：所谓编译是浏览器引擎或者babel进行的，都同样遵守ES6规范，所以编译出来都是一样的结果。

### var

var不会建立一个隐藏的词法作用域,小括号和大括号的内容作用域是一个。

```js
for (var i = 0; i < 3; i++) {
  var i = 'abc';
  console.log(i);
}
// abc
```

### const

如果使用const，由于每次新建一个变量用之前的值初始化后需要++，所以会报错

forin不会有这个问题，因为新建一个key之后，是直接用新的值进行初始化的。

```js
var funcs = [], object = {a: 1, b: 1, c: 1};
for (var key in object) {
    funcs.push(function(){
        console.log(key)
    });
}
funcs[0]()//c
```

结果是 'c';

那如果把 var 改成 let 或者 const 呢？

使用 let，结果自然会是 'a'，const 呢？ 报错还是 'a'?

结果是正确打印 'a'

## 最佳实践

在我们开发的时候，可能认为应该默认使用 let 而不是 var ，这种情况下，对于需要写保护的变量要使用 const。然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量之的改变是很多 bug 的源头。
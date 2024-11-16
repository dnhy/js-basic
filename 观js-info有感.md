## 判断对象中是否含有某个属性

- 判断实例对象本身是否有属性

Object.prototype.hasOwnProperty、Object.hasOwn()（推荐）

- 判断实例对象本身、原型链上是否有属性

a in obj

## Symbol.isConcatSpreadable

这是系统级Symbol，所有对象都是用的同一个

通常，它只复制数组中的元素。其他对象，即使它们看起来像数组一样，但仍然会被作为一个整体添加：

```js
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

……但是，如果类数组对象具有 `Symbol.isConcatSpreadable` 属性，那么它就会被 `concat` 当作一个数组来处理：此对象中的元素将被添加：

```javascript
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## sort

默认情况下按字符串比较

数字从小到大比较

```javascript
arr.sort( (a, b) => a - b );
```

## filter

```js
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// 找到 army.canJoin 返回 true 的 user
let soldiers = users.filter(army.canJoin, army);//调用canjoin函数的是window
//或者
let soldiers = users.filter(user => army.canJoin(user))//调用canjoin函数的是army
```

## number类型舍入问题

Math.floor、Math.ceil向下取整、向上取值

Math.round可以四舍五入取整

Math.trunc、parseInt、位操作符`| 0`直接舍弃小数点后的小数取整

- parseInt也可以转换字符串前缀是整数的部分为数字

- parseFloat转换字符串前缀为整数和小数的部分为数字

toFixed可以对小数点按位数四舍五入，但是如果一个十进制数的二进制存储是无限不循环小数，那toFixed(1)会存在问题

```js
6.35.toFixed(1) === 6.3 //true
```

6.35存储为二进制实际上是6.34999999999999964473....（转换回十进制），进行四舍五入一位小数是6.3,而非6.4。所以toFixed实际上是会对实际的二进制数据进行操作，Math.round、运算符等同理，只不过Math.round直接忽视小数不会有这个精度损失的问题。

### 使用toFixed发现转换为二进制后的无限不循环小数

```js
6.35.toFixed(20) //6.34999999999999964473 
```

参考：https://blog.csdn.net/MFWSCQ/article/details/97783178

## 调用对象迭代器的方式

- forof自动调用

- 手动调用

```js
let str = "Hello";


// for (let char of str) alert(char);
// 和 for..of 做相同的事
let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 一个接一个地输出字符
}
```

## 遍历对象属性

### 方法

- Object.keys/values/entries 获取所有属性会忽略 symbol 属性
- Reflect.ownKeys(obj)获取**包括 symbol 属性**的所有属性
- Object.getOwnPropertyNames获取所有属性会忽略 symbol 属性
- Object.getOwnPropertySymbols**获取对象上所有的symbol 属性**

以上方法都不能遍历对象原型链上的属性

for..in获取所有属性会忽略 symbol 属性，可以获取**实例+原型**上的属性

### 如果要遍历所有属性

```js
//实例+原型，包括symbole
const symKeys = Object.getOwnPropertySymbols(user);

let blArr = Object.getOwnPropertyNames(user);

let allKeys = blArr.concat(symKeys);

for (const key in user) {
  if (!allKeys.includes(key)) allKeys = allKeys.concat(key);
}

for (const key of allKeys) {
  console.log(key, user[key]);
}
```

### 设置一个属性不能被forin遍历的方法

设置属性key为symbol类型，或者设置属性的配置enumerable为false

## 判断对象上是否有某属性的方法

Object.prototype.hasOwnProperty()和Object.hasOwn()实例上的属性，不包含原型上的属性，包含symbol

key in obj 所有属性，实例+原型,包含symbol

Object.keys(obj).includes("name") 实例上的属性，不包含原型上的属性，不包含symbol

## 获取对象上的属性

obj.a或obj[b]

构造函数的静态方法只能由构造函数本身调用，构造函数内部的实例自身方法和构造函数原型链上的方法可以由实例调用，都是实例方法。

## Object.fromEntries(array)

传递一个二维数组，每个元素都是一个键值对组成的数组。或者传递一个MapIterator可迭代对象

返回一个普通对象，使用键值对作为属性和数值

```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // 将价格转换为数组，将每个键/值对映射为另一对 
  // 然后通过 fromEntries 再将结果转换为对象
  //entry的值为[['banana', 1],['orange', 2],['meat', 4]]
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

console.log(doublePrices)//{banana: 2, orange: 4, meat: 8}
new Map(entries)//Map(3) {'banana' => 2, 'orange' => 4, 'meat' => 8}
new Set(entries)//每个数组元素作为Set中的元素

```

## 变量未声明

直接使用未申明的变量、函数都是会报错的

但是非严格模式下可以对未声明的变量进行赋值，会把变量放到全局变量

## var

var没有块级作用域，只有全局和函数作用域

- 在全局用var声明的变量会变成全局变量

  ```js
  var gVar = 5;
  
  console.log(window.gVar); // 5（成为了全局对象的属性）
  ```

- 如果在全局、块级、函数中不声明直接赋值的变量，都会成为全局对象上的变量

  ```js
  function test(){
    gVar = 5
  }
  
  test();
  
  console.log(window.gVar); // 5（成为了全局对象的属性）
  ```

（在js module下以上两条不生效，非js module环境下即使是严格模式也生效）

## 函数

### 函数属性

函数本身是对象，可以把函数本身的执行逻辑看成对象中的一个属性。函数也可以有其他属性，其他属性不会干扰执行这个属性，也就是不会成为执行代码中的变量，但是可以在执行逻辑中通过func.count的方式拿到函数属性。

### 函数name属性

函数本身有名字就用函数本身的func，没有使用赋值的变量的sayHi。

func、sayHi都可以被函数内部调用，外部只能调用函数name属性的名称sayHi。

```js
let sayHi = function func(who) {
  console.log(func.name); //func
  console.log(sayHi.name); //func
  
  func();//允许调用
  sayHi();//允许调用，但是sayHi可能会被函数外部的代码改变
};

sayHi();
func();//报错，因为有了sayHi,func变成了一个“内部函数名”，仅在函数内部可见

let sayHi2 = function (who) {
  console.log(sayHi2.name); //sayHi2
};

sayHi2();
```

sayHi可能会被函数外部的代码改变。

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error，嵌套调用 sayHi 不再有效！
```

发生这种情况是因为该函数从它的外部词法环境获取 `sayHi`。没有局部的 `sayHi` 了，所以使用外部变量。而当调用时，外部的 `sayHi` 是 `null`。

我们给函数表达式添加的可选的名字，正是用来解决这类问题的。

func是一个内部函数名，外部不可调用，所以是可靠的调用自身方式，不会被外部改变。

```js
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 现在一切正常
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest（嵌套调用有效
```

### 函数length属性

```js
function plus2(a, b, c) {
  console.log(plus2.length)//3
  return a + b + c;
}
plus2()
```

```js
function plus2(...args) {
  console.log(plus2.length)//0
}
plus2()
```

## 对象属性配置

```js
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};
```

用普通方式定义对象属性，默认每个属性
configurable: true
enumerable: true
writable: true

```js
Object.defineProperty(user, "newProp", {
  value:'test'
});

```

用defineProperty定义属性，默认每个属性
configurable: false
enumerable: false
writable: false

除非在定义时显示指定配置。

对于已经定义的属性也可以修改配置

```js
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

//configurable: true
//enumerable: true
//writable: true
console.log(Object.getOwnPropertyDescriptor(user, 'toString'))

Object.defineProperty(user, "toString", {
  enumerable: false
});

//configurable: true
//enumerable: false
//writable: true
console.log(Object.getOwnPropertyDescriptor(user, 'toString'))
```

## 不可配置标志（configurable:false）

configurable:false会使得该属性无法通过Object.defineProperty修改value、configurable、enumerable、writable这几个配置。

```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});
```

这样配置了一个用不可更改的常量

## 克隆对象

forin不会包含symbol类型,不会赋值属性配置

```js
for (let key in user) {
  clone[key] = user[key]
}
```

Object.getOwnPropertyDescriptors返回包含 symbol 类型的和不可枚举的属性在内的 **所有** 属性描述符。

```javascript
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

举例:

```js
 let user = {
    name: "John"
  };

  Object.defineProperty(user, "name", {
    writable: false,
    configurable: false
  });
  let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));
  console.log('clone',clone);//{name: 'John'}
  console.log('1',Object.getOwnPropertyDescriptors(clone))
//{
//    "value": "John",
//    "writable": false,
//    "enumerable": true,
//    "configurable": false
//}


  const clone2 = {};
  for(let key in user){
    clone2[key] = user[key]
  }
  console.log('clone2',clone2)//{name: 'John'}
  console.log('2',Object.getOwnPropertyDescriptors(clone2))
//{
//    "value": "John",
//    "writable": true,
//    "enumerable": true,
//    "configurable": true
//}
```

## 属性的 getter 和 setter

对象中声明的getter 和 setter在实例对象上

类中声明的在原型对象上

属性设置了“getter” 和 “setter” 会在对象中添加一个属性，同时也可以在对象中设置一个同名属性。后定义的那个生效。

## 构造函数/class、对象中使用箭头函数的this指向区别

class相当于构造函数，本身是一个函数，会形成函数作用域，箭头函数本身没有this，定义时会向外层作用域寻找this，就找到了构造函数的this。

所以下面的实例中使用箭头函数的情况下this.value有值，使用一般函数，this执行调用该函数的对象，由于函数引用已经从对象中取出，调用该函数的是全局，所以指向window。

```js
class Button {
  constructor(value) {
    this.value = value;
    this.click4 = () => {
      console.log("click4", this.value);
    };
    this.click5 = function () {
      console.log("click5", this.value);
    };
  }
  click3() {
    console.log("click3", this.value);
  }
  click2 = () => {
    console.log("click2", this.value);
  };
  click = function () {
    console.log("click", this.value);
  };
}

let button = new Button("hello");
console.log("button :", button);

setTimeout(button.click, 1000); // undefined
setTimeout(button.click2, 1000); // hello
setTimeout(button.click3, 1000); // undefined
setTimeout(button.click4, 1000); // hello
setTimeout(button.click5, 1000); // undefined
```

对象本身不是作用域，箭头函数本身没有this会向外找，最终找到全局，这里就是window。一般函数this指向调用自己的对象，所以this指向obj。

```js
const obj = {
  value: "1212112",
  click: function () {
    console.log("objclick", this.value);
  },
  click2: () => {
    console.log("objclick2", this.value);
    console.log("this :", this);
  },
  click3() {
    console.log("objclick3", this.value);
  },
};
console.log("obj :", obj);

setTimeout(obj.click, 2000); // undefined
setTimeout(obj.click2, 2000); // undefined
setTimeout(obj.click3, 2000); // undefined

console.log("!!!!!");
obj.click2(); // undefined
console.log("!!!!!");
```

## class

typeof Class为function

class与一般构造函数的区别：

1. 通过 `class` 创建的函数具有特殊的内部属性标记 `[[IsClassConstructor]]: true`。

2. 类方法不可枚举。 类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。

   这很好，因为如果我们对一个对象调用 `for..in` 方法，我们通常不希望 class 方法出现。

3. 类总是使用 `use strict`。 在类构造中的所有代码都将自动进入严格模式。

### constructor

没有constructor会默认添加一个空的：

```js
class Rabbit{
  constructor() {}
}
```

### class字段

**之前可以在类中直接添加原型方法，在构造函数中添加实例属性和方法**

**现在也可以在class中添加实例属性**

```js
class User2 {
  newProp = 1213;
  
  constructor(name) {
    this.name = name;
    this.speak = () => {};
  }

  sayHi() {
    console.log(this.name);
  }
}

```



## extends

super.func()可以在继承的子类调用父类中的方法

### constructor

如果一个类扩展了另一个类并且没有 `constructor`，那么将生成下面这样的“空” `constructor`：

```js
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}
```

### [[ConstructorKind]]:"derived"

继承类具有特殊的内部属性 `[[ConstructorKind]]:"derived"`。这是一个特殊的内部标签。该标签会影响它的 `new` 行为：

 当继承的 constructor 执行时，创建一个空对象后，不会将其赋值给this。它期望父类的 constructor 来完成这项工作。

所以**继承类的 constructor 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。**

因为子类new时this的指向改为当前创建的对象这个操作需要交给父类构造函数进行

### 子类重写字段问题

如果父类字段被重写，super调用父类构造器时总是使用父类的吗，而不用子类重写的。父类方法被重写时，父类构造器会用子类的。

**父类构造器总是会使用它自己字段的值，而不是被重写的那一个**

1. 原因分析：

实际上，原因在于字段初始化的顺序。类字段是这样初始化的：

- 对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
- 对于派生类，在 `super()` 后立刻初始化

也就是说父类构造器被调用时，子类字段还未初始化，所以用父类的字段。

2. 问题修复：使用方法或者 getter/setter 替代类字段

## static

通常，静态方法用于实现属于整个类，但不属于该类任何特定对象的函数。

### 静态方法

在 `User.staticMethod()` 调用中的 `this` 的值是类构造器 `User` 自身（“点符号前面的对象”规则）。

```js
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

### 静态属性

静态的属性也是可能的，它们看起来就像常规的类属性，但前面加有 `static`：

```javascript
class Article {
  static publisher = "Levi Ding";
}

alert( Article.publisher ); // Levi Ding
```

这等同于直接给 `Article` 赋值：

```javascript
Article.publisher = "Levi Ding";
```

### 继承的静态属性和方法

“extends” 语法会设置两个原型：

1. 在构造函数的 `"prototype"` 之间设置原型（为了获取实例方法）。
2. 在构造函数之间会设置原型（为了获取静态方法）。

因此可以得出：

- 子类继承自父类，所以子类可以访问到父类的静态方法和属性。
- 子类的prototype继承自父类的prototype
- 子类的对象由子类构造，继承自父类的prototype，所以对象可以访问子类和父类的prototype对象中的属性和方法。
- 所有的类都隐式继承自Object，但只设置1
- 由于上面1点，导致所有的对象通常都继承自 `Object.prototype`。

## 类显式加上extends Object和不加的区别

所有的类都原型链继承自Object，但不是extends Object。原型链继承只会在构造函数的 `"prototype"` 之间设置原型，而不会在构造函数之间会设置原型，所以可以使用父类的实例方法，不能用静态方法。

extends Object加上后，意味着：

```javascript
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

**Rabbit` 可以通过 `Rabbit` 访问 `Object` 的静态方法**，像这样：

```javascript
class Rabbit extends Object {}

// 通常我们调用 Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
```

但是如果我们没有 `extends Object`，那么 `Rabbit.__proto__` 将不会被设置为 `Object`。

下面是示例：

```javascript
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // true，所有函数都是默认如此

// error，Rabbit 中没有这样的函数
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
```

所以，在这种情况下，`Rabbit` 没有提供对 `Object` 的静态方法的访问。

另外不管加不加`extends Object`，类都可以访问Function.prototype中的方法（call，bind等），不加类直接继承自Function.prototype（类本质是一个函数），加了之后类本身继承自Object，Object本身继承自Function.prototype。

所以，简而言之，这里有两点区别：

| class Rabbit                              | class Rabbit extends Object         |
| :---------------------------------------- | :---------------------------------- |
| –                                         | 需要在 constructor 中调用 `super()` |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object`       |
| 传统的继承                                | 类的extends继承                     |

相同点：

Rabbit.prototype.\_\_proto\_\_ = Object.prototype

### 总结

所有的对象都可以使用构造类中定义的实例方法，构造类的原型方法、父类中定义的实例方法（调用了super），父类的原型方法（构造类的prototype继承了父类的prototype），Object的原型方法（类的prototype继承自Object的prototype）。**也就是说对象继承所有父类实例和原型上的一切，除了静态属性和方法**。

所有的类都可以使用自己的静态方法，父类的静态方法。可以使用Function的原型方法，但无法使用Object的静态方法（**类的继承被默认设定成了Function.prototype**，所有的函数也都是这样）。

所有的函数本身继承自Function.prototype，函数原型继承自Object.prototype。所以可以使用Function原型中的方法。

### 函数传统的继承和类的extends比较：

函数原型链继承（传统的继承）：

子函数原型直接继承父函数原型，子函数本身继承自Function.prototype

类的extends：

子类原型直接继承父类原型，子类本身继承自父类

## 受保护的属性

**受保护的属性通常以下划线 `_` 作为前缀。**

这不是在语言级别强制实施的，但是程序员之间有一个众所周知的约定，即不应该从外部访问此类型的属性和方法。

1.可以使用getter/setter 语法设置一个新的变量对_前缀变量进行访问和修改

2.也可以使用`get.../set...` 函数通过函数取访问

## 只读属性

只设置getter不设置setter

## 私有属性

私有属性和方法应该以 `#` 开头。它们只在类的内部可被访问，且被子类继承后也不能访问，私有字段也不能通过 this[name] 访问。

一般不用，而使用受保护的字段

```js
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

// 不能从类的外部访问类的私有属性和方法
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error

class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}

this['#name']//不能访问
```

## Promise

### then

then中的函数可以看作是隐式返回了一个promise，return的值就是这个promise的resolve的值，如果发送错误继续抛出报错，就返回一个promise并在其中reject这个抛出的错误。

### finally

- finally可以添加附加逻辑，不接受上一层的返回值（回调函数没有参数），而是直接将结果传给下一层。
- 如果 `finally` 处理程序返回了一些内容，那么这些内容会被忽略。
- 当 `finally` 抛出 error 时，执行将转到最近的 error 的处理程序。

### catch

promise调用reject之后会由最近的catch捕获错误

在 executor 周围有一个“隐式 `try..catch`”自动捕获了 error，并将其变为 rejected promise。

`try..catch`只能捕获代码同步运行时的错误，异步的错误无法捕获

这里的错误并不是在 executor 运行时生成的，而是在稍后生成的。因此，promise 无法处理它。

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    func();//catch无法捕获这个函数不存在的错误
  });
}).catch((err) => {
  console.log("1112", err);
});
```

```js

try {
  setTimeout(() => {
    func();//catch无法捕获这个函数不存在的错误
  });
} catch (error) {
  console.error("error111", error);
}

```

需要在异步任务的executor上进行捕获

```js
try {
  setTimeout(() => {
    try {
      func();
    } catch (error) {
      console.error("error222", error);//可以捕获
    }
  });
} catch (error) {
  console.error("error111", error);
}
```

## HTTPS中不能加载HTTP内容

原因：这属于混合内容，浏览器要么对混合内容中的**可升级内容**将其升级为HTTPS，要么对**可阻止内容**进行阻止。

HTTP中可以加载HTTPS内容，这不属于混合内容，浏览器不会阻止。

https://blog.csdn.net/lee_slly/article/details/125908055

https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content

### 如何让HTTPS中加载HTTP内容

使用可升级的元素加载HTTP内容

## url编码

### encodeURI

对URL编码，将URL禁止的字符（如中文）进行编码

适用场景：

对中文字符进行编码

### encodeURIComponent

对URL编码，将URL禁止的字符（如中文）以及`#`，`$`，`&`，`+`，`,`，`/`，`:`，`;`，`=`，`?` 和 `@` 字符进行编码

适用场景：

1.带有&的url、带有&的字符串作为其他url参数传递时，防止打开该url参数里的`&`影响后面参数的获取

2.用整个url生成二维码，编码中文字符、防止打开二维码的地址时带`&`的参数影响后面的参数获取

```js
//   window.location.href = '/twopage?name=aaa&测试&urlTest=http://baidu.com?test=夏天&roll=qwqw'

window.location.href = `/twopage?name=${encodeURIComponent('aaa&测试')}&urlTest=${encodeURIComponent('http://baidu.com?test=夏天&roll=qwqw')}`

```

### vue路由跳转

自动对`&`进行编码，其他不编码

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

（在js module下以上两条不生效）

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


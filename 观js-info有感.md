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

Math**.**trunc、parseInt、位操作符`|`直接舍弃小数点后的小数取整

parseInt也可以转换字符串前缀是整数的部分为数字

parseFloat转换字符串前缀为整数和小数的部分为数字

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

// 和 for..of 做相同的事
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 一个接一个地输出字符
}
```


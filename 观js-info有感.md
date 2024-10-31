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


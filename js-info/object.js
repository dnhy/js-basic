import _, { forIn } from "lodash";
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

var obj = _.cloneDeep(user);
console.log("obj :", obj);

// TODO：手写深浅拷贝

let fruit = "apple";
let bag = {
  [fruit + " and orange"]: 5, // 属性名是从 fruit 变量中得到的
};

let bag2 = {};
bag2[fruit] = 123;
console.log(bag);
console.log(bag2);

// 表达式可以分为字面量和变量
// 按数据类型也可以划分为原始数据类型和引用数据类型

const s = Symbol();
const f = () => {};
const objT = { a: 123 };
// 属性名只能是字符串或Symbol类型，其他类型会被转成字符串
// 字符串可以省略"",变量必须加[]表示是一个变量
let foo = {
  [s]: 123,
  123: "!!!", //实际是"123":"!!!"
  bar: "111",
  true: true, //实际是"true"":true
  [f]: true,
  [objT]: 1212,
};

console.log("foo", foo);
// 字符串可以点取值，变量需要加[]表示是一个变量取值
// []取到变量或字面量值之后会先被转成字符串，再去变量中找
const num = 123;
console.log(
  foo.bar,
  foo[123], //123转成"123""
  foo["123"],
  foo[num], //num是变量拿到123,转成"123"
  foo[s],
  foo["true"],
  foo[true], //拿到布尔值true，转成字符串"true""
  foo.true, //true实际上是"true"
  foo[objT],
);

let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA",
};
for (const key in codes) {
  console.log(key);
}

// 创建一个函数并立即使用 new 调用它
let userTest = new (function () {
  this.name = "John";
  this.isAdmin = false;

  // ……用于用户创建的其他代码
  // 也许是复杂的逻辑和语句
  // 局部变量等
})();

function User() {
  console.log(new.target);
  console.log("this", this instanceof User);
}

User();
new User();
let user1221 = null;
let x = 0;

user1221?.sayHi(x++);
// 对象Symbol属性的隐藏式对于遍历方法forin Object.keys的隐藏、以及其他模块拿到对象后直接访问该属性的隐藏
// 使用in、 Object.getOwnPropertySymbols(obj) 、Reflect.ownKeys(obj) 还是可以访问到

const a = { test: 123 };
Object.freeze(a);

// 用纯函数重写 class User

const symbol = Symbol();
// 1. 创建构造器函数
function User(name) {
  this.name = name;
  this[symbol] = 122121;
}
// 函数的原型（prototype）默认具有 "constructor" 属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
User.prototype.sayHi = function () {
  console.log(this.name);
};

// 用法：
let user = new User("John");
console.log("user :", user);
user.sayHi();

console.log(Object.getOwnPropertyNames(user));
console.log(Object.getOwnPropertySymbols(user));

for (const key in user) {
  console.log("key :", key);
}

for (const key in user) {
  if (Object.hasOwn(user, key)) {
    const element = user[key];
    console.log("element :", element);
  }
}

console.log(symbol in user);
//遍历所有属性:实例+原型，包括symbole
const symKeys = Object.getOwnPropertySymbols(user);

let blArr = Object.getOwnPropertyNames(user);

let allKeys = blArr.concat(symKeys);

for (const key in user) {
  if (!allKeys.includes(key)) allKeys = allKeys.concat(key);
}

for (const key of allKeys) {
  console.log(key, user[key]);
}

console.log(Object.getOwnPropertyDescriptor(user, symbol));

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

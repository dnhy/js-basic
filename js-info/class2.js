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

// 佐证：User 是一个函数
console.log(typeof User2); // function

const user = new User2();
console.log("user :", user);

class ExtendedClock {
  constructor({ template, precision }) {
    this._template = template;
    this.precision = precision;
  }
}
let lowResolutionClock = new ExtendedClock({
  template: "h:m:s",
  precision: 10000,
});

console.log("lowResolutionClock :", lowResolutionClock);
class Rabbit extends Object {
  constructor(name) {
    super();
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// hasOwnProperty 方法来自于 Object.prototype
console.log(rabbit.hasOwnProperty("name")); // true

var gVar = 5;

console.log(globalThis.gVar);

// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // 内建方法将使用这个作为 constructor
  static get [Symbol.species]() {
    return PowerArray;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);

Array.prototype.filter2 = function (func, thisArg) {
  const species = this.constructor[Symbol.species];
  const _this = thisArg ? thisArg : this;

  const newArr = new (species ? species : _this.constructor)();

  for (let i = 0; i < _this.length; i++) {
    func(_this[i], i, _this) ? newArr.push(_this[i]) : void 0;
  }

  return newArr;
};

Array.prototype.map2 = function (func, thisArg) {
  const species = this.constructor[Symbol.species];
  const _this = thisArg ? thisArg : this;

  const newArr = new (species ? species : _this.constructor)();

  for (let i = 0; i < _this.length; i++) {
    newArr.push(func(_this[i], i, _this));
  }

  return newArr;
};

let filteredArr = arr.filter2((item, index) => {
  return item >= 10 && index === 4;
});

console.log("filteredArr", filteredArr); // 10, 50
// console.log(filteredArr.isEmpty()); // false

const newArr2 = arr.map((item, index) => {
  if (index === 0) {
  } else {
    return item + "-i:" + index;
  }
});

const newArr3 = arr.map2((item, index) => {
  if (index === 0) {
  } else {
    return item + "-i:" + index;
  }
});
console.log("newArr2 :", newArr2);
console.log("newArr3 :", newArr3);
console.log("newArr2.isEmpty() :", newArr2.isEmpty());

console.log("newArr3.isEmpty() :", newArr3.isEmpty());

// 所有的函数、类都原型链继承自Object
function Test() {}

const test = new Test();

console.log(test.hasOwnProperty);
console.log(Object.prototype.hasOwnProperty);

let user2 = {
  a: 1222,
  // toString() {
  //   return "abc";
  // },
  [Symbol.toStringTag]: "toStringTag",
};

console.log(user2 + "");

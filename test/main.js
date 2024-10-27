'use strict';
const module2 = require('./a.js');
var person = {
  name: '张三',
};

var proxy = new Proxy(person, {
  get(target, p, receiver) {
    return Reflect.get(target, p);
  },
});

// console.log(proxy.name);

let arr = createArr(3, 4, 5);
console.log('arr :', arr[-1]);

function createArr(...elements) {
  const target = [...elements];
  return new Proxy(target, {
    get(target, p, receiver) {
      let index = +p;

      if (index < 0) {
        index = index + elements.length + '';
      }

      return target[index];
    },
  });
}

// var bar = Object.defineProperties(
//   {},
//   {
//     foo: {
//       value: 123,
//       writable: false, //能不能改赋值运算符修改
//       configurable: false, //能不能配置修改+能不能删
//     },
//   },
// );
const bar = {
  foo: 123,
};
var res = Object.defineProperty(bar, 'foo', {});
console.log('res :', res);

var proxy = new Proxy(bar, {
  get(target, p, receiver) {
    return Reflect.get(target, p) + 11;
  },
  defineProperty(target, property, attributes) {
    if (property === 'foo') {
      return Reflect.defineProperty(target, property, {
        ...attributes,
        value: '!@###',
      });
    }
  },
});

Object.defineProperty(proxy, 'foo', {
  value: '111111111',
  writable: true,
  configurable: true,
});
console.log('proxy :', proxy.foo);

const personProxy = new Proxy(
  {},
  {
    set(obj, p, value) {
      if (p === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
      }

      obj[p] = value;
      return true;
    },
    deleteProperty(target, property, attributes) {
      if (property[0] === '_') {
        throw new Error(`无法删除私有属性`);
      }
      return Reflect.deleteProperty(target, property);
    },
  },
);

personProxy.age = 1221;
personProxy._prop = 'xxx';
// delete personProxy._prop;
console.log('personProxy :', personProxy);

// proxy实现观察者模式
const observerQueue = new Set();
const addObserver = (fn) => observerQueue.add(fn);
const createProxy = (obj) =>
  new Proxy(obj, {
    set(target, p, newValue, receiver) {
      observerQueue.forEach((fn) => fn());
      return Reflect.set(target, p, newValue);
    },
  });

addObserver(() => {
  console.log('对象发生变化1');
});

addObserver(() => {
  console.log('对象发生变化2');
});
const obj = { key: 123 };
const proxyObj = createProxy(obj);
proxyObj.key = 1111;

// map, filter, reduce
var a = [1, 2, 3, false, true, 0].filter(Boolean);
console.log('Boolean :', Boolean);
console.log(Boolean(0));
console.log('a :', a);
const arr2 = [1, 2, 3];
const mapArray = arr2.map((value) => value * 2);
console.log('mapArray :', mapArray);

const reduceArray = arr2.reduce((p, c, i) => {
  return p.concat(c * 2);
}, []);

console.log('reduceArray :', reduceArray);


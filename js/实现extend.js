const { type, isFunction } = require('./type');

// 从零实现jQuery的extend
// 1.我自己的版本
var shallowCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
function extend(...args) {
  const target = args[0];
  for (let i = 1; i < args.length; i++) {
    const curr = args[i];
    if (curr == null) return;
    for (const key in curr) {
      if (Object.hasOwnProperty.call(curr, key)) {
        if (typeof curr[key] !== 'object') target[key] = curr[key];
        else {
          target[key] = shallowCopy(curr[key]);
        }
      }
    }
  }

  return target;
}

var obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 },
};

var obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3,
};

var obj3 = {
  d: 4,
};

var res = extend(obj1, obj2, obj3);

res.b.b1 = 12121;

// console.log(res, obj2.b);

function extend2(...args) {
  var i = 0,
    target,
    deep;

  if (typeof args[0] === 'boolean') {
    target = args[1];
    deep = args[0];
    i = 2;
  } else {
    target = args[0];
    deep = false;
  }

  console.log('target :', target);
  // 如果合并时出现材料对象属性是对象，目标对象不是，就把目标对象的属性转化为对象，如target是2，材料对象是{c:123}
  if (typeof target !== 'object' && !isFunction(target)) target = {};

  for (; i < args.length; i++) {
    for (const key in args[i]) {
      if (Object.hasOwnProperty.call(args[i], key)) {
        let curr = args[i][key];

        // 解决循环引用
        if (curr === target) continue;

        // 如果材料对象的属性是对象，就递归调用，使其内部属性合并
        if (deep && curr && typeof curr === 'object') {
          target[key] = extend2(deep, target[key], curr);
        } else if (curr !== undefined) {
          // 如果不是对象，直接合并
          target[key] = curr;
        }
      }
    }
  }

  return target;
}
var obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 },
  e: { test: 'eeee' },
};

var obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3,
  e: undefined,
};

var obj3 = {
  d: 4,
};

// console.log(extend2(false, obj1, obj2, obj3));
var obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};

var obj2 = {
  b: {
    c: [5],
  },
};
var d = extend2(true, obj1, obj2);
// console.log(d);

var a = { name: b };
var b = { name: a };
var c = extend2(a, b);
console.log('c :', c);

function name(...args) {
  console.log('args :', args);
  var a = { nice: 123 };
  console.log('[ arguments ] >', arguments);
  console.log('[ ...arguments ] >', ...arguments);
}

name(1, 2, 3);

// var lsz = { 0: 'a', 1: 'b', length: 2 };
// console.log(...lsz);

var foo = { test: 123 };
var bar = { ...foo };
console.log('bar :', bar);
console.log('[ foo===bar ] >', foo === bar);

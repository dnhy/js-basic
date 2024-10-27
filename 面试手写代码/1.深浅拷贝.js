// shallowClone
// 只拷贝一层，属性值是对象的还是会引用同一个对象
function shallowClone(source) {
  const target = {};
  for (var key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}

// 优化：判断源数据是否为对象类型，兼容数组
function shallowCloneOpmt(source) {
  if (typeof source != 'object' || source === null) return source;
  // const target = source instanceof Array ? [] : {};
  let target = new source.constructor();
  // 循环一层属性，进行克隆
  for (var key in source) {
    if (Object.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}

const fxArr = ['One', 'Two', 'Three'];
var newArr = fxArr.slice(0);

var newArr = fxArr.concat();

var newArr = Object.assign([], fxArr);

var newArr = [...fxArr];
console.log('newArr :', newArr);

// deepClone
// 完全拷贝，新旧对象的深层对象不会相互影响
function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj; //递归出口
  // date类型和正则直接用构造函数克隆
  // if (obj instanceof Date) return new Date(obj);
  // if (obj instanceof RegExp) return new RegExp(obj);
  if (/^(Function)|(Date)|(RegExp)|(Map)|(Set)$/i.test(obj.constructor.name)) {
    return new obj.constructor(obj);
  }
  // map标记每一个出现过的属性，避免循环引用
  if (map.get(obj)) return map.get(obj);
  let cloneObj = new obj.constructor();
  map.set(obj, cloneObj);
  // 对每个属性进行递归，如果是对象继续递归，如果不是直接返回，返回后完成克隆
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }

  return cloneObj;
}

// test
var inner = {
  foo: 123,
};
const obj1 = {
  name: 'init',
  arr: [1, [2, 3], 4],
  data: new Map([
    ['name', 'Tom'],
    ['age', 12],
  ]),
  d: null,
  inner,
  more: inner,
};

const newObj = deepClone2(obj1);
// const newObj = shallowClone2(obj1);
newObj.name = '222';
newObj.arr[1] = {};
newObj.data.set('name', 'Jerry');
newObj.d = 1212;

console.log('obj1 :', obj1);
console.log('newObj :', newObj);

function shallowClone2(obj) {
  if (typeof obj != 'object' || obj === null) {
    return obj;
  }

  // let cloneObj = obj instanceof Array ? [] : {};
  let cloneObj = new obj.constructor();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = obj[key];
    }
  }

  return cloneObj;
}

function deepClone2(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj;
  // if (obj instanceof Date) return new Date(obj);
  // if (obj instanceof RegExp) return RegExp(obj);
  if (/^(Function)|(Date)|(RegExp)|(Map)|(Set)$/i.test(obj.constructor.name)) {
    return new obj.constructor(obj);
  }
  if (map.get(obj)) {
    return map.get(obj);
  }
  const cloneObj = new obj.constructor();
  map.set(obj, cloneObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone2(obj[key], map);
    }
  }
  return cloneObj;
}

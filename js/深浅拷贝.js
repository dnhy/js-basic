//浅拷贝
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

var foo = ['123', { test: 123 }];
var bar = shallowCopy(foo);
bar[0] = '4556';
// console.log(foo, bar); //[ '123', { test: 123 } ] [ '4556', { test: 123 } ]
bar[1].now = '2333';
// console.log(foo, bar); //[ '123', { test: 123, now: '2333' } ] [ '4556', { test: 123, now: '2333' } ]

//常见的浅拷贝技巧
var origin = [1, 2, 3];
var res = origin.concat();
var res2 = origin.slice();
// console.log(origin, res);
// console.log(origin, res2);

//深拷贝
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }

  return newObj;
};
var foo = ['123', { test: 123 }];
var bar = deepCopy(foo);
bar[0] = '4556';
console.log(foo, bar); //[ '123', { test: 123 } ] [ '4556', { test: 123 } ]
bar[1].now = '2333';
console.log(foo, bar); //[ '123', { test: 123 } ] [ '4556', { test: 123, now: '2333' } ]

//常见的深拷贝技巧
JSON.stringify();

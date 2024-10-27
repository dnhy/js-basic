function sum(a, b, c) {
  return a + b + c;
}

sum(1, 2, 3);
currySum(1)(2)(3);
// sum改成柯里化：每一层嵌套函数都收集一个参数，需要的参数集齐后调用原函数
function currySum(a) {
  return function (b) {
    return function (c) {
      return sum(a, b, c);
    };
  };
}

// 每传递一个参数，返回一个函数继续供传递后面的参数调用
// 直到传递完所有参数，使用所有参数调用原函数
// 原函数结果值返回给最后一个构建的函数，并由这个函数返回出来
function curry(func) {
  return function nest(...args) {
    if (func.length === args.length) {
      return func(...args);
    } else {
      return function (newArg) {
        return nest(...args, newArg);
      };
    }
  };
}

function createFunc(func, length, params) {
  if (length > 0) {
    return function () {
      params.push(arguments[0]);
      return createFunc(func, length - 1, params);
    };
  }
  return func(...params);
}

function sum(a, b, c) {
  return a + b + c;
}

const currySumFn = curry(sum);
let res = currySumFn(1)(2)(3);
console.log('res :', res);

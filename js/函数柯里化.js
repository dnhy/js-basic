var curry = function (fn) {
  //获取柯里化时就传入的参数,并转化为数组
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // args和调用柯里化处理过的函数时的参数合并
    var newArgs = args.concat([].slice.call(arguments));
    // 使用凑齐的参数调用原函数
    return fn.apply(this, newArgs);
  };
};

function add(a, b) {
  return a + b;
}

var addCurry = curry(add);
console.log(addCurry(1, 2));

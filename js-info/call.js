function work(a, b) {
  //   console.log(a + b); // work 是一个任意的函数或方法
  return a + b;
}

work = spy(work);

console.log(work(1, 2)); // 3
console.log(work(4, 5)); // 9

for (let args of work.calls) {
  console.log("call:" + args.join()); // "call:1,2", "call:4,5"
}

function spy(func) {
  const wrapper = function () {
    wrapper.calls.push(Array.from(arguments));

    // 如果不绑定，那就是window调用的func
    // 如果不返回func结果，那包装后的函数只能执行原函数逻辑，而拿不到原函数返回值
    return func.call(this, ...arguments);
  };
  wrapper.calls = [];

  return wrapper;
}

function f(x) {
  console.log(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 在 1000ms 后显示 "test"
f1500("test"); // 在 1500ms 后显示 "test"

function delay(func, time) {
  return function () {
    setTimeout(() => {
      return func.apply(this, arguments);
    }, time);
  };
}

function debounce(func, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      return func.apply(this, arguments);
    }, delay);
  };
}

const obj = {
  a: 123,
  foo: function (...args) {
    console.log(this.a + "!" + args.join() + " foofoofoofoo");
  },
};

let dFoo = debounce(obj.foo, 1000);
obj.foo = dFoo;
// dFoo(1, 2, 3);
obj.foo(4, 5, 6);

function f(a) {
  console.log(a);
}

// f1000 最多每 1000ms 将调用传递给 f 一次
let f10002 = throttle(f, 1000);

f10002(1); // 显示 1
f10002(2); // (节流，尚未到 1000ms)
f10002(3); // (节流，尚未到 1000ms)

// 当 1000ms 时间到...
// ...输出 3，中间值 2 被忽略

function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      setTimeout(() => {
        timer = null;
        func.apply(this, arguments);
      }, delay);
    }
  };
}

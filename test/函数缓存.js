const add = (a, b) => {
  console.log('计算了');
  return a + b;
};
const plus = memoize(add);
console.log(plus(1, 2));
console.log(plus(1, 2));

function memoize(func, content) {
  let cache = Object.create(null);
  content = content || this;
  return function (...args) {
    if (!cache[args]) {
      cache[args] = func.apply(content, args);
    }

    return cache[args];
  };
}

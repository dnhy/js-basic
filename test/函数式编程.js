//偏函数
// 创建一个函数，固定一些参数，并可以处理后续传入的参数
const partical = (f, ...args) => {
  return (...moreArgs) => {
    return f(...args, ...moreArgs);
  };
};

const plus = (a, b, c) => {
  return a + b + c;
};

const plusPart = partical(plus, 1, 2);

console.log('plusPart(3) :', plusPart(3));
// 使用bind实现偏函数
const add1More = plus.bind(null, 2, 3);



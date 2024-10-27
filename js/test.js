let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  //   [Symbol.toPrimitive]() {
  //     return 2;
  //   },
};
1 + a; // => 3
// console.log('1 + a :', 1 + a);

var test = function () {
  console.log('test');
  return function () {
    console.log('inner');
  }.apply();
}.apply();

console.log(test);

// test();

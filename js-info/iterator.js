let range = {
  from: 1,
  to: 5,
};

// forof启动时调用Symbol.iterator这个方法，这个方法返回一个迭代器对象
// forof取下一个值时调用迭代器对象的next方法
// next方法返回一个对象，格式必须是 {done: Boolean, value: any}，当 done=true 时，表示循环结束，否则取value值,然后value值++。
range[Symbol.iterator] = function () {
  return {
    curr: this.from,
    last: this.to,
    next() {
      if (this.curr < this.last) {
        return { done: false, value: this.curr++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (const val of range) {
  console.log("val :", val);
}

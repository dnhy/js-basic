let bar = 123;
function foo(params) {
  console.log(bar);
  bar2 = "qwqwqw";
  console.log("bar2 :", bar2);
  console.log("bar2 :", window.bar2);
}
bar3 = "333333";
console.log("bar3 :", bar3);

foo();
console.log("bar2 :", bar2);
console.log("window.bar2 :", window.bar2);

console.log(sum(1)(2));

function sum(a) {
  return function (b) {
    return a + b;
  };
}

/* .. inBetween 和 inArray 的代码 */
let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

console.log(arr.filter(inArray([1, 2, 10]))); // 1,2

function inBetween(...range) {
  return function (item) {
    return item <= range[1] && item >= range[0];
  };
}

function inArray(range) {
  return function (item) {
    return range.includes(item);
  };
}

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];

users.sort(byField("name"));
users.sort(byField("age"));

function byField(tag) {
  return (a, b) => {
    return a[tag] > b[tag] ? 1 : -1;
  };
}

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let k = i;
    let shooter = function () {
      // 创建一个 shooter 函数，
      console.log(k); // 应该显示其编号
    };
    shooters.push(shooter); // 将此 shooter 函数添加到数组中

    i++;
  }

  // ……返回 shooters 数组
  return shooters;
}

let army = makeArmy();

// ……所有的 shooter 显示的都是 10，而不是它们的编号 0, 1, 2, 3...
army[0](); // 编号为 0 的 shooter 显示的是 10
army[1](); // 编号为 1 的 shooter 显示的是 10
army[2](); // 10，其他的也是这样。

function makeCounter() {
  let count = 0;

  return function counter() {
    counter.set = (n) => {
      count = n;
    };
    counter.decrease = () => {
      count--;
    };

    return count++;
  };
}

let counter = makeCounter();

console.log("--------");
console.log(counter()); // 0
console.log(counter()); // 1

counter.set(10); // set the new count

console.log(counter()); // 10

counter.decrease(); // decrease the count by 1

console.log(counter()); // 10 (instead of 11)

function plus(...args) {
  return args.reduce((p, c) => {
    return p + c;
  });
}

function plus2(a, b, c) {
  return a + b + c;
}

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

const he = curry(plus2);
console.log("he :", he);

// he(1)(2) == 3; // 1 + 2
console.log("he(1)(2)(3) :", he(1)(2)(3));
// he(5)(-1)(2) == 6;
// he(6)(-1)(-2)(-3) == 0;
// he(0)(1)(2)(3)(4)(5) == 15;

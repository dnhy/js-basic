let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

console.log(sorted); // CSS, HTML, JavaScript
console.log(arr); // HTML, JavaScript, CSS (no changes)

function copySorted(arr) {
  return [].concat(arr).sort();
}

function Calculator() {
  this.map = new Map();
  this.map.set("+", (a, b) => a + b);
  this.map.set("-", (a, b) => a - b);

  this.calculate = (str) => {
    const arr = str.split(" ");
    const a = +arr[0];
    const operator = arr[1];
    const b = +arr[2];
    if (!this.map.has(operator) || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.map.get(operator)(a, b);
  };
}

Calculator.prototype.addMethod = function (operator, func) {
  this.map.set(operator, func);
};

let calc = new Calculator();

calc.addMethod("*", (a, b) => a * b);
calc.addMethod("/", (a, b) => a / b);
calc.addMethod("**", (a, b) => a ** b);

console.log(calc.calculate("2 ** 3"));

console.log(calc.calculate("3 + 7"));

let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [john, pete, mary];

let usersMapped = users.map((item) => ({
  fullName: item.name + item.surname,
  id: item.id,
}));
/* ... your code ... */

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // John Smith

let john2 = { name: "John", age: 25 };
let pete2 = { name: "Pete", age: 30 };
let mary2 = { name: "Mary", age: 28 };
let arr2 = [pete2, john2, mary2];

function sortByAge(arr) {
  return arr.sort((a, b) => a.age - b.age);
}

function getAverageAge(arr) {
  return (
    arr.reduce((p, c) => {
      return p + c.age;
    }, 0) / arr.length
  ).toFixed(2);
}

console.log("getAverageAge(arr) :", getAverageAge(arr2));

console.log("sortByAge(arr) :", sortByAge(arr2));
function unique(arr) {
  /* your code */

  const set = new Set(arr);

  return Array.from(set);
}

let strings = [
  "Hare",
  "Krishna",
  "Hare",
  "Krishna",
  "Krishna",
  "Krishna",
  "Hare",
  "Hare",
  ":-O",
];

console.log(unique(strings)); // Hare, Krishna, :-O

let users2 = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users2);
console.log("usersById :", usersById);

function groupById(arr) {
  return arr.reduce((p, c) => {
    p[c.id] = c;
    return p;
  }, {});
}
let i = 0;
while (i != 10) {
  i = +(i + 0.2).toFixed(2);
  console.log("i :", i);
}

const styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor(styles.length / 2)] = "Classics";

console.log(styles.shift(0));
styles.unshift("Rap", "Reggae");
console.log("styles :", styles);

function getMaxSubSum(arr) {
  let sum = 0;
  let maxSum = 0;
  for (const e of arr) {
    sum += e;
    maxSum = Math.max(sum, maxSum);
    if (sum < 0) sum = 0;
  }

  return maxSum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));

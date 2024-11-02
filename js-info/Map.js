function unique(arr) {
  const set = new Set(arr);
  return Array.from(set);
}

let values = [
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

console.log("unique(values) :", unique(values));

let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());

// Error: keys.push is not a function
keys.push("more");
console.log("keys :", keys);

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log("aclean(arr) :", aclean(arr));

function aclean(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == null) continue;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] == null) continue;
      if (equal(arr[i], arr[j])) {
        arr[j] = null;
      }
    }
  }
  console.log("arr :", arr);

  return arr.filter((e) => e !== null);
}

function equal(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const map = new Map();
  for (let i = 0; i < a.length; i++) {
    map.set(a[i], map.has(a[i]) ? map.get(a[i]) + 1 : 1);
  }

  for (let i = 0; i < b.length; i++) {
    if (!map.has(b[i])) return false;
    map.set(b[i], map.get(b[i]) - 1);
  }

  for (const val of map.values()) {
    if (val > 0) {
      return false;
    }
  }
  return true;
}

let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

const wmap = new WeakMap();
messages.forEach((message) => {
  wmap.set(message, false);
});
console.log("wmap :", wmap);

// messages[0] = null;
// messages.shift();
// messages.splice(0, 1);
console.log("messages :", messages);
console.log("wmap :", wmap);

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(sumSalaries(salaries)); // 650

function sumSalaries(salaries) {
  const vals = Object.values(salaries);
  let sum = 0;
  for (const e of vals) {
    sum += e;
  }

  return sum;
}

let user = {
  name: "John",
  age: 30,
};

console.log(count(user)); // 2
function count(obj) {
  return Object.keys(obj).length;
}

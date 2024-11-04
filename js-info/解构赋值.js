let user = {
  name: "John",
  years: 30,
};

let name, years, isAdmin;
({ name, years, isAdmin = false } = user);
console.log("isAdmin :", isAdmin);
console.log("years :", years);
console.log("name :", name);

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function topSalary(salaries) {
  let maxName = null;
  let maxSum = -Infinity;
  for (const [name, salary] of Object.entries(salaries)) {
    if (salary > maxSum) {
      maxName = name;
      maxSum = salary;
    }
  }

  return maxName;
}

let res = topSalary(salaries);
console.log("res :", res);

const map = new Map([
  ["a", 123],
  ["b", "qw"],
]);
for (const item of map.entries()) {
  console.log("item :", item);
}
